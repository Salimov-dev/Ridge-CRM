import { useState } from "react";

const useDialogObjectHandlers = () => {
  const [state, setState] = useState({
    createPage: false,
    objectPage: false,
    objectId: null
  });
  console.log("state", state);

  // обновление стейта при открытии страницы объекта
  const handleOpenObjectPage = (objectId) => {
    setState((prevState) => ({
      ...prevState,
      objectPage: true,
      objectId: objectId
    }));
  };
  const handleCloseObjectPage = () => {
    setState((prevState) => ({ ...prevState, objectPage: false }));
  };

  // обновление стейта при открытии страницы создания объекта
  const handleOpenCreateObjectPage = () => {
    setState((prevState) => ({ ...prevState, createPage: true }));
  };
  const handleCloseCreateObjectPage = () => {
    setState((prevState) => ({ ...prevState, createPage: false }));
  };

  // обновление стейта при открытии страницы обновления объекта
  const handleOpenUpdateObjectPage = () => {
    setState((prevState) => ({ ...prevState, updatePage: true }));
  };
  const handleCloseUpdateObjectPage = () => {
    setState((prevState) => ({ ...prevState, updatePage: false }));
  };

  return {
    handleOpenCreateObjectPage,
    handleCloseCreateObjectPage,
    handleOpenObjectPage,
    handleCloseObjectPage,
    handleOpenUpdateObjectPage,
    handleCloseUpdateObjectPage,
    state,
    setState
  };
};

export default useDialogObjectHandlers;
