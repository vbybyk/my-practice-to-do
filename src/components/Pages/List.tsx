import { useState } from "react";
import { Layout, Button, Checkbox, Menu } from "antd";
import { DeleteFilled } from "@ant-design/icons";
import type { CheckboxChangeEvent } from "antd/es/checkbox";
import "./list.scss";

const { Content } = Layout;

interface Task {
  task: string;
  id: number;
  checked: boolean;
  filter: string;
}

const menuItems = [
  { label: "All", key: "ALL" },
  { label: "Active", key: "ACTIVE" },
  { label: "Complited", key: "COMPLITED" },
];

export const List: React.FC = () => {
  const [input, setInput] = useState<string>("");
  const [tasksArr, setTasksArr] = useState<Task[]>([]);
  const [filter, setFilter] = useState<string>("ALL");

  const onHandleSubmit = (input: string) => {
    const newTask: Task = {
      task: input,
      id: Date.now(),
      checked: false,
      filter: "ACTIVE",
    };
    setTasksArr((prev) => [newTask, ...prev]);
    setInput("");
  };

  const onChecked = (e: CheckboxChangeEvent, id: number, filter: string) => {
    const checkedArr = tasksArr.map((item: Task) => {
      if (item.id === id) {
        console.log(filter);
        return { ...item, checked: !item.checked, filter: filter === "ACTIVE" ? "COMPLITED" : "ACTIVE" };
      }
      return item;
    });
    console.log(checkedArr);
    setTasksArr(checkedArr);
  };

  const onKeyDown = (e: any) => {
    if (e.key === "Enter") {
      onHandleSubmit(input);
    }
  };

  const onDelete = (id: number) => {
    const deletedArr = tasksArr.filter((item) => {
      if (item.id !== id) {
        return item;
      }
    });
    setTasksArr(deletedArr);
  };

  const onFilter = (key: string) => {
    setFilter(key);
  };

  const tasksListFiltered = tasksArr.filter((item: Task) => {
    switch (filter) {
      case "ALL":
        return item;
      case "ACTIVE":
        return item.filter === "ACTIVE";
      case "COMPLITED":
        return item.filter === "COMPLITED";
    }
  });

  const tasksList = tasksListFiltered.map(({ id, task, checked, filter }: Task) => {
    const clazz = checked ? "list-item__title-checked" : "list-item__title";
    return (
      <li className="list-item" key={id}>
        <Checkbox className="list-checkbox" onChange={(e) => onChecked(e, id, filter)} />
        <h2 className={clazz}>{task}</h2>
        <DeleteFilled onClick={() => onDelete(id)} />
      </li>
    );
  });

  const tasksListRender = tasksListFiltered.length !== 0 ? tasksList : <h2>No Tasks</h2>;

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
