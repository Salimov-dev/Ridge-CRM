import * as dayjs from "dayjs";

const useDialogHandlers = (setState) => {
  // обновление стейта при открытии страницы создания объекта
  const handleOpenCreateObjectPage = () => {
    setState((prevState) => ({ ...prevState, createPage: true }));
  };
  const handleCloseCreateObjectPage = () => {
    setState((prevState) => ({ ...prevState, createPage: false }));
  };

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
  // обновление стейта при открытии страницы обновления объекта
  const handleOpenUpdatePresentationPage = (presentationId) => {
    setState((prevState) => ({
      ...prevState,
      updatePresentationPage: true,
      presentationId: presentationId
    }));
  };
  const handleCloseUpdatePresentationPage = () => {
    setState((prevState) => ({ ...prevState, updatePresentationPage: false }));
  };

  // обновление стейта при открытии окна передачи объекта другому менеджеру
  const handleOpenTransferObjectPage = () => {
    setState((prevState) => ({ ...prevState, transferObjectPage: true }));
  };
  const handleCloseTransferObjectPage = () => {
    setState((prevState) => ({ ...prevState, transferObjectPage: false }));
  };

  // обновление стейта при создании задачи себе
  const handleOpenCreateMyTaskPage = (day) => {
    setState((prevState) => ({
      ...prevState,
      createMyTaskPage: true,
      dateCreate: day instanceof dayjs ? day : null
    }));
  };
  const handleCloseCreateMyTaskPage = () => {
    setState((prevState) => ({ ...prevState, createMyTaskPage: false }));
  };

  // обновление стейта при обновлении задачи себе
  const handleOpenUpdateMyTaskPage = (taskId) => {
    setState((prevState) => ({
      ...prevState,
      updateMyTaskPage: true,
      taskId: taskId
    }));
  };
  const handleCloseUpdateMyTaskPage = () => {
    setState((prevState) => ({ ...prevState, updateMyTaskPage: false }));
  };

  // обновление стейта при создании задачи менеджеру
  const handleOpenCreateManagerTaskPage = (day) => {
    setState((prevState) => ({
      ...prevState,
      createManagerTaskPage: true,
      dateCreate: day instanceof dayjs ? day : null
    }));
  };
  const handleCloseCreateManagerTaskPage = () => {
    setState((prevState) => ({ ...prevState, createManagerTaskPage: false }));
  };

  // обновление стейта при обновлении задачи менеджеру
  const handleOpenUpdateManagerTaskPage = (taskId) => {
    setState((prevState) => ({
      ...prevState,
      updateManagerTaskPage: true,
      taskId: taskId
    }));
  };
  const handleCloseUpdateManagerTaskPage = () => {
    setState((prevState) => ({ ...prevState, updateManagerTaskPage: false }));
  };

  // обновление стейта при создании последнего контакта
  const handleOpenCreateLastContactPage = () => {
    setState((prevState) => ({
      ...prevState,
      createLastContactPage: true
    }));
  };
  const handleCloseCreateLastContactPage = () => {
    setState((prevState) => ({
      ...prevState,
      createLastContactPage: false
    }));
  };

  // обновление стейта при обновлении последнего контакта
  const handleOpenUpdateLastContactPage = (lastContactId) => {
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

  // обновление стейта при создании встречи
  const handleOpenCreateMeetingPage = (day) => {
    setState((prevState) => ({
      ...prevState,
      createMeetingPage: true,
      dateCreate: day instanceof dayjs ? day : null
    }));
  };
  const handleCloseCreateMeetingPage = () => {
    setState((prevState) => ({
      ...prevState,
      createMeetingPage: false
    }));
  };

  // обновление стейта при обновлении встречи
  const handleOpenUpdateMeetingPage = (meetingId) => {
    setState((prevState) => ({
      ...prevState,
      updateMeetingPage: true,
      meetingId: meetingId
    }));
  };
  const handleCloseUpdateMeetingPage = () => {
    setState((prevState) => ({
      ...prevState,
      updateMeetingPage: false
    }));
  };

  // обновление стейта при обновлении автарки пользователя
  const handleOpenUpdateUserAvatarPage = () => {
    setState((prevState) => ({
      ...prevState,
      avatarUpdatePage: true
    }));
  };
  const handleCloseUpdateUserAvatarPage = () => {
    setState((prevState) => ({
      ...prevState,
      avatarUpdatePage: false
    }));
  };

  // обновление стейта при открытии окна страницы авторизации
  const handleOpenAuthPage = (startPage) => {
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

  // обновление стейта при обновлении данных в профиле
  const handleOpenUpdateProfilePage = () => {
    setState((prevState) => ({
      ...prevState,
      updateProfilePage: true
    }));
  };
  const handleCloseUpdateProfilePage = () => {
    setState((prevState) => ({
      ...prevState,
      updateProfilePage: false
    }));
  };

  // обновление стейта при обновлении пароля
  const handleOpenUpdatePasswordPage = () => {
    setState((prevState) => ({
      ...prevState,
      updatePasswordPage: true
    }));
  };
  const handleCloseUpdatePasswordPage = () => {
    setState((prevState) => ({
      ...prevState,
      updatePasswordPage: false
    }));
  };

  // обновление стейта при создании менеджера
  const handleOpenCreateUserPage = () => {
    setState((prevState) => ({
      ...prevState,
      createUserPage: true
    }));
  };
  const handleCloseCreateUserPage = () => {
    setState((prevState) => ({
      ...prevState,
      createUserPage: false
    }));
  };

  // обновление стейта при пополении баланса
  const handleOpenMakePaymentPage = () => {
    setState((prevState) => ({
      ...prevState,
      makePaymentPage: true
    }));
  };

  const handleCloseMakePaymentPage = () => {
    setState((prevState) => ({
      ...prevState,
      makePaymentPage: false
    }));
  };

  return {
    handleOpenAuthPage,
    handleCloseAuthPage,
    handleOpenCreateObjectPage,
    handleCloseCreateObjectPage,
    handleOpenUpdateObjectPage,
    handleCloseUpdateObjectPage,
    handleOpenObjectPage,
    handleCloseObjectPage,
    handleOpenCreatePresentationPage,
    handleCloseCreatePresentationPage,
    handleOpenUpdatePresentationPage,
    handleCloseUpdatePresentationPage,
    handleOpenTransferObjectPage,
    handleCloseTransferObjectPage,
    handleOpenCreateMyTaskPage,
    handleCloseCreateMyTaskPage,
    handleOpenUpdateMyTaskPage,
    handleCloseUpdateMyTaskPage,
    handleOpenCreateManagerTaskPage,
    handleCloseCreateManagerTaskPage,
    handleOpenUpdateManagerTaskPage,
    handleCloseUpdateManagerTaskPage,
    handleOpenCreateLastContactPage,
    handleCloseCreateLastContactPage,
    handleOpenUpdateLastContactPage,
    handleCloseUpdateLastContactPage,
    handleOpenCreateMeetingPage,
    handleCloseCreateMeetingPage,
    handleOpenUpdateMeetingPage,
    handleCloseUpdateMeetingPage,
    handleOpenUpdateUserAvatarPage,
    handleCloseUpdateUserAvatarPage,
    handleOpenUpdateProfilePage,
    handleCloseUpdateProfilePage,
    handleOpenUpdatePasswordPage,
    handleCloseUpdatePasswordPage,
    handleCloseCreateUserPage,
    handleOpenCreateUserPage,
    handleOpenMakePaymentPage,
    handleCloseMakePaymentPage
  };
};

export default useDialogHandlers;
