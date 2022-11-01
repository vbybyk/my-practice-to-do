export interface ITaskState {
  favoriteTasks?: ITask[];
  setFavoriteTasks: (tasks: any) => void;
  getFavorite: () => void;
  updateFavorite: (values: any) => void;
}
export interface ITask {
  task: string;
  id: number;
  checked: boolean;
  filter: string;
}
