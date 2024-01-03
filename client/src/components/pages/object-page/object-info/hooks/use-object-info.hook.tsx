const useObjectInfo = (setState) => {
  // обновление стейта при создании задачи себе
  const handleOpenCreateMyTaskPage = () => {
    setState((prevState) => ({
      ...prevState,
      createMyTaskPage: true,
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
      taskId: taskId,
    }));
  };
  const handleCloseUpdateMyTaskPage = () => {
    setState((prevState) => ({ ...prevState, updateMyTaskPage: false }));
  };

  // обновление стейта при создании задачи менеджеру
  const handleOpenCreateManagerTaskPage = () => {
    setState((prevState) => ({
      ...prevState,
      createManagerTaskPage: true,
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
      taskId: taskId,
    }));
  };
  const handleCloseUpdateManagerTaskPage = () => {
    setState((prevState) => ({ ...prevState, updateManagerTaskPage: false }));
  };

  // обновление стейта при создании последнего контакта
  const handleOpenCreateLastContactPage = () => {
    setState((prevState) => ({
      ...prevState,
      createLastContactPage: true,
    }));
  };
  const handleCloseCreateLastContactPage = () => {
    setState((prevState) => ({
      ...prevState,
      createLastContactPage: false,
    }));
  };

  // обновление стейта при обновлении последнего контакта
  const handleOpenUpdateLastContactPage = (lastContactId) => {
    setState((prevState) => ({
      ...prevState,
      updateLastContactPage: true,
      lastContactId: lastContactId,
    }));
  };
  const handleCloseUpdateLastContactPage = () => {
    setState((prevState) => ({
      ...prevState,
      updateLastContactPage: false,
    }));
  };

  // обновление стейта при создании встречи
  const handleOpenCreateMeetingPage = () => {
    setState((prevState) => ({
      ...prevState,
      createMeetingPage: true,
    }));
  };
  const handleCloseCreateMeetingPage = () => {
    setState((prevState) => ({
      ...prevState,
      createMeetingPage: false,
    }));
  };

  // обновление стейта при обновлении встречи
  const handleOpenUpdateMeetingPage = (meetingId) => {
    setState((prevState) => ({
      ...prevState,
      updateMeetingPage: true,
      meetingId: meetingId,
    }));
  };
  const handleCloseUpdateMeetingPage = () => {
    setState((prevState) => ({
      ...prevState,
      updateMeetingPage: false,
    }));
  };
  return {
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
  };
};

export default useObjectInfo;