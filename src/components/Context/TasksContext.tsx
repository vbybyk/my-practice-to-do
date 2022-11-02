import { createContext, useContext } from "react";
import useTasks from "../Hooks/useTasks";
import { ITaskState } from "../Interfaces/tasks";

export const TasksContext = createContext(null as ITaskState | null);

export const useTasksContext = () => {
  const context = useContext(TasksContext);
  if (!context) {
    throw new Error("useTasksContext must be used within a TasksContextProvider");
  }
  return context;
};

const TasksContextProvider = ({ children }: any) => {
  return (
    <TasksContext.Provider
      value={{
        ...useTasks(),
      }}
    >
      {children}
    </TasksContext.Provider>
  );
};

export default TasksContextProvider;
