const useObject = (setState) => {
  // обновление стейта при открытии страницы создания объекта
  const handleOpenCreateObjectPage = () => {
    setState((prevState) => ({ ...prevState, createPage: true }));
  };
  const handleCloseCreateObjectPage = () => {
    setState((prevState) => ({ ...prevState, createPage: false }));
  };

  // обновление стейта при открытии страницы объекта
  const handleOpenObjectPage = (objectId) => {
    // console.log("objectId", objectId);

    setState((prevState) => ({
      ...prevState,
      objectPage: true,
      objectId: objectId,
    }));
  };
  const handleCloseObjectPage = () => {
    setState((prevState) => ({ ...prevState, objectPage: false }));
  };

  // обновление стейта при открытии страницы обновления объекта
  const handleOpenUpdateObjectPage = () => {
    setState((prevState) => ({ ...prevState, updatePage: true }));
  };
  const handleCloseUpdateObjectPage = () => {
    setState((prevState) => ({ ...prevState, updatePage: false }));
  };

  // обновление стейта при открытии окна создания презентации
  const handleOpenCreatePresentationPage = () => {
    setState((prevState) => ({ ...prevState, presentationPage: true }));
  };
  const handleCloseCreatePresentationPage = () => {
    setState((prevState) => ({ ...prevState, presentationPage: false }));
  };

  // обновление стейта при открытии окна передачи объекта другому менеджеру
  const handleOpenTransferObjectPage = () => {
    setState((prevState) => ({ ...prevState, transferObjectPage: true }));
  };
  const handleCloseTransferObjectPage = () => {
    setState((prevState) => ({ ...prevState, transferObjectPage: false }));
  };
  return {
    handleOpenCreateObjectPage,
    handleCloseCreateObjectPage,
    handleOpenUpdateObjectPage,
    handleCloseUpdateObjectPage,
    handleOpenObjectPage,
    handleCloseObjectPage,
    handleOpenCreatePresentationPage,
    handleCloseCreatePresentationPage,
    handleOpenTransferObjectPage,
    handleCloseTransferObjectPage,
  };
};

export default useObject;
