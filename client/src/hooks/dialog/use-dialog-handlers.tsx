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
    setState((prevState) => ({ ...prevState, createPresentationPage: true }));
  };
  const handleCloseCreatePresentationPage = () => {
    setState((prevState) => ({ ...prevState, createPresentationPage: false }));
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
      dateCreate: day && day.format ? day : null
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
      dateCreate: day && day.format ? day : null
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
  const handleOpenCreateLastContactPage = (objectId) => {
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
      dateCreate: day && day.format ? day : null
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

  // обновление стейта при создании члена команды
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

  // обновление стейта при обновлении члена команды
  const handleOpenUpdateUserPage = (meetingId) => {
    setState((prevState) => ({
      ...prevState,
      updateUserPage: true,
      userId: meetingId
    }));
  };
  const handleCloseUpdateUserPage = () => {
    setState((prevState) => ({
      ...prevState,
      updateUserPage: false
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

  // обновление стейта при открытии окна создания контакта
  const handleOpenCreateContactPage = () => {
    setState((prevState) => ({ ...prevState, createContactPage: true }));
  };
  const handleCloseCreateContactPage = () => {
    setState((prevState) => ({ ...prevState, createContactPage: false }));
  };

  // обновление стейта при обновлении контакта
  const handleOpenContactPage = (contactId) => {
    setState((prevState) => ({
      ...prevState,
      openContactPage: true,
      contactId: contactId
    }));
  };
  const handleCloseContactPage = () => {
    setState((prevState) => ({
      ...prevState,
      openContactPage: false
    }));
  };

  // обновление стейта при открытии окна создания компании
  const handleOpenCreateCompanyPage = () => {
    setState((prevState) => ({ ...prevState, createCompanyPage: true }));
  };
  const handleCloseCreateCompanyPage = () => {
    setState((prevState) => ({ ...prevState, createCompanyPage: false }));
  };

  // обновление стейта при открытии  страницы правки компании
  const handleOpenUpdateCompanyPage = (companyId) => {
    setState((prevState) => ({
      ...prevState,
      updateCompanyPage: true,
      companyId: companyId
    }));
  };
  const handleCloseUpdateCompanyPage = () => {
    setState((prevState) => ({
      ...prevState,
      updateCompanyPage: false
    }));
  };

  // обновление стейта при открытии лицензия
  const handleOpenAgreementPage = () => {
    setState((prevState) => ({
      ...prevState,
      agreementPage: true
    }));
  };
  const handleCloseAgreementPage = () => {
    setState((prevState) => ({
      ...prevState,
      agreementPage: false
    }));
  };

  // обновление стейта при открытии перс данные
  const handleOpenPersonalPolicyPage = () => {
    setState((prevState) => ({
      ...prevState,
      personalPolicyPage: true
    }));
  };
  const handleClosePersonalPolicyPage = () => {
    setState((prevState) => ({
      ...prevState,
      personalPolicyPage: false
    }));
  };

  // обновление стейта при открытии страницы с видео
  const handleOpenVideoPlayerPage = () => {
    setState((prevState) => ({
      ...prevState,
      videoPlayerPage: true
    }));
  };
  const handleCloseVideoPlayerPage = () => {
    setState((prevState) => ({
      ...prevState,
      videoPlayerPage: false
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
    handleCloseMakePaymentPage,
    handleOpenCreateContactPage,
    handleCloseCreateContactPage,
    handleOpenContactPage,
    handleCloseContactPage,
    handleOpenCreateCompanyPage,
    handleCloseCreateCompanyPage,
    handleOpenUpdateCompanyPage,
    handleCloseUpdateCompanyPage,
    handleOpenAgreementPage,
    handleCloseAgreementPage,
    handleOpenPersonalPolicyPage,
    handleClosePersonalPolicyPage,
    handleOpenUpdateUserPage,
    handleCloseUpdateUserPage,
    handleOpenVideoPlayerPage,
    handleCloseVideoPlayerPage
  };
};

export default useDialogHandlers;
