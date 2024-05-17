import { Dispatch, SetStateAction } from "react";
import { IDialogPagesState } from "@interfaces/state/dialog-pages-state.interface";

interface IAuthDialogsStateProps {
  setState: Dispatch<SetStateAction<IDialogPagesState>>;
}

const authDialogsState = ({ setState }: IAuthDialogsStateProps) => {
  const handleOpenAuthPage = (startPage: any) => {
    setState((prevState) => ({
      ...prevState,
      authPage: true,
      startPage: startPage
    }));
  };
  const handleCloseAuthPage = () => {
    setState((prevState) => ({
      ...prevState,
      authPage: false
    }));
  };

  return {
    handleOpenAuthPage,
    handleCloseAuthPage
  };
};

export default authDialogsState;
