import { useState } from "react";
import { useFetch } from "./useFetch";

const useTasks = () => {
  const { request } = useFetch();
  const [favoriteTasks, setFavoriteTasks] = useState([]);

  const getFavorite = () => {
    request("http://localhost:3001/favorite")
      .then((data: any) => setFavoriteTasks(data))
      .then((data: any) => console.log(data, "getTasks"))
      .catch((error: any) => console.log(error));
  };
  const updateFavorite = (values: any) => {
    request(`http://localhost:3001/favorite`, "POST", JSON.stringify(values))
      .then((data: any) => console.log(data, "Created"))
      // .then((data: any) => setTasks(data))
      .catch((error: any) => console.log(error));
  };
  console.log(favoriteTasks);
  return { favoriteTasks, updateFavorite, getFavorite, setFavoriteTasks };
};
export default useTasks;
