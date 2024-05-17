import { IDialogPagesState } from "@interfaces/state/dialog-pages-state.interface";
import { Dispatch, SetStateAction } from "react";

interface ITasksDialogsStateProps {
  setState: Dispatch<SetStateAction<IDialogPagesState>>;
}

const tasksDialogsState = ({ setState }: ITasksDialogsStateProps) => {
  const handleOpenCreateMyTaskPage = (day: any) => {
    setState((prevState) => ({
      ...prevState,
      createMyTaskPage: true,
      dateCreate: day && day.format ? day : null
    }));
  };
  const handleCloseCreateMyTaskPage = () => {
    setState((prevState) => ({ ...prevState, createMyTaskPage: false }));
  };

  const handleOpenUpdateMyTaskPage = (taskId: string) => {
    setState((prevState) => ({
      ...prevState,
      updateMyTaskPage: true,
      taskId: taskId
    }));
  };
  const handleCloseUpdateMyTaskPage = () => {
    setState((prevState) => ({ ...prevState, updateMyTaskPage: false }));
  };

  const handleOpenCreateManagerTaskPage = (day: any) => {
    setState((prevState) => ({
      ...prevState,
      createManagerTaskPage: true,
      dateCreate: day && day.format ? day : null
    }));
  };
  const handleCloseCreateManagerTaskPage = () => {
    setState((prevState) => ({ ...prevState, createManagerTaskPage: false }));
  };

  const handleOpenUpdateManagerTaskPage = (taskId: string) => {
    setState((prevState) => ({
      ...prevState,
      updateManagerTaskPage: true,
      taskId: taskId
    }));
  };
  const handleCloseUpdateManagerTaskPage = () => {
    setState((prevState) => ({ ...prevState, updateManagerTaskPage: false }));
  };

  return {
    handleOpenCreateMyTaskPage,
    handleCloseCreateMyTaskPage,
    handleOpenUpdateMyTaskPage,
    handleCloseUpdateMyTaskPage,
    handleOpenCreateManagerTaskPage,
    handleCloseCreateManagerTaskPage,
    handleOpenUpdateManagerTaskPage,
    handleCloseUpdateManagerTaskPage
  };
};

export default tasksDialogsState;
