import { useEffect, useState } from "react";
import { Layout, Checkbox } from "antd";
import useTasks from "../Hooks/useTasks";
import { DeleteFilled } from "@ant-design/icons";
import type { CheckboxChangeEvent } from "antd/es/checkbox";
import { ITask } from "../Interfaces/tasks";
import "./list.scss";

const { Content } = Layout;

export const Favorite: React.FC = () => {
  const { favoriteTasks, getFavorite } = useTasks();
  const [tasksArr, setTasksArr] = useState<ITask[]>([]);

  useEffect(() => {
    getFavorite();
  }, []);

  useEffect(() => {
    setTasksArr(favoriteTasks);
  }, [favoriteTasks]);

  console.log("favorite tasks", favoriteTasks);
  console.log("tasks array", tasksArr);

  const onHandleSubmit = (input: string) => {
    const newTask: ITask = {
      task: input,
      id: Date.now(),
      checked: false,
      filter: "ACTIVE",
    };
    setTasksArr((prev) => [newTask, ...prev]);
  };

  const onChecked = (e: CheckboxChangeEvent, id: number, filter: string) => {
    const checkedArr = tasksArr.map((item: ITask) => {
      if (item.id === id) {
        console.log(filter);
        return { ...item, checked: !item.checked, filter: filter === "ACTIVE" ? "COMPLITED" : "ACTIVE" };
      }
      return item;
    });
    console.log(checkedArr);
    setTasksArr(checkedArr);
  };

  const onDelete = (id: number) => {
    const deletedArr = tasksArr.filter((item) => {
      if (item.id !== id) {
        return item;
      }
    });
    setTasksArr(deletedArr);
  };

  const tasksList = tasksArr.map(({ id, task, checked, filter }: ITask) => {
    const clazz = checked ? "list-item__title-checked" : "list-item__title";
    return (
      <li className="list-item" key={id}>
        <Checkbox className="list-checkbox" onChange={(e) => onChecked(e, id, filter)} />
        <h2 className={clazz}>{task}</h2>
        <DeleteFilled onClick={() => onDelete(id)} />
      </li>
    );
  });

  const tasksListRender = tasksArr.length !== 0 ? tasksList : <h2>No Tasks</h2>;

  return (
    <Content className="favorite-container">
      <div className="list-page">
        <div className="list-block">
          <ul className="list-tasks">{tasksListRender}</ul>
        </div>
      </div>
    </Content>
  );
};
