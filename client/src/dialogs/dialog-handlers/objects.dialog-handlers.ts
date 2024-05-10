import { Dispatch, SetStateAction } from "react";
import { IDialogPagesState } from "@interfaces/state/dialog-pages-state.interface";

interface IObjectsDialogsStateProps {
  setState: Dispatch<SetStateAction<IDialogPagesState>>;
}

const objectsDialogsState = ({ setState }: IObjectsDialogsStateProps) => {
  const handleOpenCreateObjectPage = () => {
    setState((prevState: IDialogPagesState) => ({
      ...prevState,
      createPage: true
    }));
  };
  const handleCloseCreateObjectPage = () => {
    setState((prevState: IDialogPagesState) => ({
      ...prevState,
      createPage: false
    }));
  };

  const handleOpenObjectPage = (objectId: string) => {
    setState((prevState) => ({
      ...prevState,
      objectPage: true,
      objectId: objectId
    }));
  };
  const handleCloseObjectPage = () => {
    setState((prevState) => ({ ...prevState, objectPage: false }));
  };

  const handleOpenUpdateObjectPage = () => {
    setState((prevState) => ({ ...prevState, updatePage: true }));
  };
  const handleCloseUpdateObjectPage = () => {
    setState((prevState) => ({ ...prevState, updatePage: false }));
  };

  const handleOpenTransferObjectPage = () => {
    setState((prevState) => ({ ...prevState, transferObjectPage: true }));
  };
  const handleCloseTransferObjectPage = () => {
    setState((prevState) => ({ ...prevState, transferObjectPage: false }));
  };

  return {
    handleOpenCreateObjectPage,
    handleCloseCreateObjectPage,
    handleOpenObjectPage,
    handleCloseObjectPage,
    handleOpenUpdateObjectPage,
    handleCloseUpdateObjectPage,
    handleOpenTransferObjectPage,
    handleCloseTransferObjectPage
  };
};

export default objectsDialogsState;
