import dayjs from "dayjs";

const useObjectInfo = (
  setOpenCreateMeeting,
  setOpenCreateMyTask,
  setOpenCreateManagerTask,
  setDateCreateMyTask
) => {
  const handleOpenCreateMeeting = () => {
    setOpenCreateMeeting(true);
  };

  const handleOpenCreateManagerTask = () => {
    setOpenCreateManagerTask(true);
    setOpenCreateMyTask(false);
  };

  const handleOpenCreateMyTask = () => {
    setDateCreateMyTask(dayjs());
    setOpenCreateMyTask(true);
  };
  const handleCloseCreateMeeting = () => {
    setOpenCreateMeeting(false);
  };
  const handleCloseCreateManagerTask = () => {
    setOpenCreateManagerTask(false);
  };
  const handleCloseCreateMyTask = () => {
    setOpenCreateMyTask(false);
    setDateCreateMyTask(null);
  };
  return {
    handleOpenCreateMeeting,
    handleOpenCreateManagerTask,
    handleOpenCreateMyTask,
    handleCloseCreateMeeting,
    handleCloseCreateManagerTask,
    handleCloseCreateMyTask,
  };
};

export default useObjectInfo;
