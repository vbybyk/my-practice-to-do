import { useEffect, useState } from "react";
import { Layout, Checkbox, Space, Alert } from "antd";
import { useTasksContext } from "../Context/TasksContext";
import { DeleteOutlined, StarFilled, PlusOutlined } from "@ant-design/icons";
import type { CheckboxChangeEvent } from "antd/es/checkbox";
import { ITask } from "../Interfaces/tasks";
import "./list.scss";

const { Content } = Layout;

export const Favorite: React.FC = () => {
  const { favoriteTasks, getFavorite, deleteFavorite, getFavoriteById } = useTasksContext();
  const [tasksArr, setTasksArr] = useState<ITask[]>([]);
  const [alert, setAlert] = useState<boolean>(false);

  useEffect(() => {
    getFavorite();
  }, []);

  useEffect(() => {
    favoriteTasks && setTasksArr(favoriteTasks);
  }, [favoriteTasks]);

  const onHandleSubmit = (id: number) => {
    getFavoriteById(id);
    setAlert(!alert);
  };

  const onChecked = (e: CheckboxChangeEvent, id: number, filter: string) => {
    const checkedArr = tasksArr.map((item: ITask) => {
      if (item.id === id) {
        return { ...item, checked: !item.checked, filter: filter === "ACTIVE" ? "COMPLITED" : "ACTIVE" };
      }
      return item;
    });
    setTasksArr(checkedArr);
  };

  const onDelete = (id: number) => {
    const deletedArr = tasksArr.filter((item) => {
      if (item.id !== id) {
        return item;
      }
    });
    setTasksArr(deletedArr);
    deleteFavorite(id);
  };

  const tasksList = tasksArr.map(({ id, task, checked, filter }: ITask) => {
    const clazz = checked ? "list-item__title-checked" : "list-item__title";
    return (
      <li className="list-item" key={id}>
        <Checkbox className="list-checkbox" onChange={(e) => onChecked(e, id, filter)} />
        <h2 className={clazz}>{task}</h2>
        <div className="icons">
          <Space size={36}>
            <PlusOutlined onClick={() => onHandleSubmit(id)} />
            <StarFilled style={{ color: "#f8de15" }} />
            <DeleteOutlined onClick={() => onDelete(id)} />
          </Space>
        </div>
      </li>
    );
  });

  return (
    <Content className="favorite-container">
      {alert && (
        <Alert
          message="You succesfully added a Favorite task to the Tasks List"
          banner
          closable
          type="success"
          showIcon
        />
      )}
      <h2 className="favorite-title">Your Favorite tasks</h2>
      <div className="favorite-page">
        <div className="list-block">
          <ul className="list-tasks">{tasksList}</ul>
        </div>
      </div>
    </Content>
  );
};
