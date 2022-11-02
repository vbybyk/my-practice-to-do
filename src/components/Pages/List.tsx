import { useState } from "react";
import { useTasksContext } from "../Context/TasksContext";
import { Layout, Button, Checkbox, Menu, Space } from "antd";
import { DeleteOutlined, StarTwoTone, StarFilled } from "@ant-design/icons";
import type { CheckboxChangeEvent } from "antd/es/checkbox";
import { ITask } from "../Interfaces/tasks";
import "./list.scss";

const { Content } = Layout;

const menuItems = [
  { label: "All", key: "ALL" },
  { label: "Active", key: "ACTIVE" },
  { label: "Complited", key: "COMPLITED" },
];

export const List: React.FC = () => {
  const { tasksArr, setTasksArr, updateFavorite } = useTasksContext();
  const [input, setInput] = useState<string>("");
  const [filter, setFilter] = useState<string>("ALL");

  const onHandleSubmit = (input: string) => {
    const newTask: ITask = {
      task: input,
      id: Date.now(),
      checked: false,
      filter: "ACTIVE",
      favorite: false,
    };
    setTasksArr((prev: any) => [newTask, ...prev]);
    setInput("");
  };

  const onChecked = (e: CheckboxChangeEvent, id: number, filter: string) => {
    const checkedArr =
      tasksArr &&
      tasksArr.map((item: ITask) => {
        if (item.id === id) {
          return { ...item, checked: !item.checked, filter: filter === "ACTIVE" ? "COMPLITED" : "ACTIVE" };
        }
        return item;
      });
    setTasksArr(checkedArr);
  };

  const onKeyDown = (e: any) => {
    if (e.key === "Enter") {
      onHandleSubmit(input);
    }
  };

  const onDelete = (id: number) => {
    const deletedArr =
      tasksArr &&
      tasksArr.filter((item) => {
        if (item.id !== id) {
          return item;
        }
      });
    setTasksArr(deletedArr);
  };

  const onFilter = (key: string) => {
    setFilter(key);
  };

  const onToggleFavorite = (id: number) => {
    const checkedArr =
      tasksArr &&
      tasksArr.map((item: ITask) => {
        if (item.id === id) {
          return { ...item, favorite: !item.favorite };
        }
        return item;
      });
    const favItems: any = tasksArr?.filter((item: ITask) => {
      if (item.id === id && !item.favorite) {
        return item;
      }
    });
    setTasksArr(checkedArr);
    updateFavorite(favItems[0]);
  };

  const tasksListFiltered =
    tasksArr &&
    tasksArr.filter((item: ITask) => {
      switch (filter) {
        case "ALL":
          return item;
        case "ACTIVE":
          return item.filter === "ACTIVE";
        case "COMPLITED":
          return item.filter === "COMPLITED";
      }
    });

  const tasksList = tasksListFiltered?.map(({ id, task, checked, filter, favorite }: ITask) => {
    const clazz = checked ? "list-item__title-checked" : "list-item__title";
    return (
      <li className="list-item" key={id}>
        <Checkbox className="list-checkbox" onChange={(e) => onChecked(e, id, filter)} defaultChecked={checked} />
        <h2 className={clazz}>{task}</h2>
        <div className="icons">
          <Space size={36}>
            {favorite ? (
              <StarFilled onClick={() => onToggleFavorite(id)} style={{ color: "#f8de15" }} />
            ) : (
              <StarTwoTone onClick={() => onToggleFavorite(id)} twoToneColor="#f8de15" />
            )}
            <DeleteOutlined onClick={() => onDelete(id)} />
          </Space>
        </div>
      </li>
    );
  });

  const tasksListRender = tasksListFiltered?.length !== 0 ? tasksList : <h2>No Tasks</h2>;

  return (
    <Content className="list-container">
      <div className="list-page">
        <div className="input-block">
          <input
            type="text"
            placeholder="Write your task here..."
            className="input"
            onChange={(e) => setInput(e.target.value)}
            value={input}
            onKeyPress={onKeyDown}
          />
          <Button type="primary" onClick={() => onHandleSubmit(input)} onKeyDown={onKeyDown}>
            Add task
          </Button>
        </div>
        <div className="list-block">
          <Menu items={menuItems} mode="horizontal" onClick={(e) => onFilter(e.key)} />
          <ul className="list-tasks">{tasksListRender}</ul>
        </div>
      </div>
    </Content>
  );
};
