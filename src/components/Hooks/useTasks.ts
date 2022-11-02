import { useState } from "react";
import { useFetch } from "./useFetch";
import { ITask } from "../Interfaces/tasks";

const useTasks = () => {
  const { request } = useFetch();
  const [tasksArr, setTasksArr] = useState<ITask[]>([]);
  const [favoriteTasks, setFavoriteTasks] = useState([]);

  const getFavorite = () => {
    request("http://localhost:3001/favorite")
      .then((data: any) => setFavoriteTasks(data))
      .then((data: any) => console.log(data, "getTasks"))
      .catch((error: any) => console.log(error));
  };
  const getFavoriteById = (id: number) => {
    request(`http://localhost:3001/favorite/${id}`)
      .then((data: any) => setTasksArr((prev: any) => [...prev, data]))
      .then((data: any) => console.log(data, "getOneFavorite"))
      .catch((error: any) => console.log(error));
  };
  const updateFavorite = (values: any) => {
    request(`http://localhost:3001/favorite`, "POST", JSON.stringify(values))
      .then((data: any) => console.log(data, "Created"))
      .catch((error: any) => console.log(error));
  };
  const deleteFavorite = (id: number) => {
    request(`http://localhost:3001/favorite/${id}`, "DELETE")
      .then((data: any) => console.log(data, "Deleted"))
      .catch((error: any) => console.log(error));
  };

  return {
    tasksArr,
    setTasksArr,
    favoriteTasks,
    getFavoriteById,
    updateFavorite,
    getFavorite,
    setFavoriteTasks,
    deleteFavorite,
  };
};
export default useTasks;
