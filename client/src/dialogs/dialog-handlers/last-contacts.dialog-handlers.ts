import { Dispatch, SetStateAction } from "react";
import { IDialogPagesState } from "@interfaces/state/dialog-pages-state.interface";

interface ILastContactsDialogsStateProps {
  setState: Dispatch<SetStateAction<IDialogPagesState>>;
}

const lastContactsDialogsState = ({
  setState
}: ILastContactsDialogsStateProps) => {
  const handleOpenCreateLastContactPage = (objectId: string) => {
    setState((prevState) => ({
      ...prevState,
      createLastContactPage: true,
      objectId: objectId
    }));
  };
  const handleCloseCreateLastContactPage = () => {
    setState((prevState) => ({
      ...prevState,
      createLastContactPage: false
    }));
  };

  const handleOpenUpdateLastContactPage = (lastContactId: string) => {
    setState((prevState) => ({
      ...prevState,
      updateLastContactPage: true,
      lastContactId: lastContactId
    }));
  };
  const handleCloseUpdateLastContactPage = () => {
    setState((prevState) => ({
      ...prevState,
      updateLastContactPage: false
    }));
  };

  return {
    handleOpenCreateLastContactPage,
    handleCloseCreateLastContactPage,
    handleOpenUpdateLastContactPage,
    handleCloseUpdateLastContactPage
  };
};

export default lastContactsDialogsState;
