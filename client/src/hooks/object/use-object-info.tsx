import dayjs from "dayjs";
import { useDispatch } from "react-redux";
import { setUpdateMeetingOpenState } from "../../store/meeting/update-meeting.store";
import { setupdateMyTaskOpenState } from "../../store/task/update-task.store";
import { setUpdateManagerTaskOpenState } from "../../store/task/update-manager-task.store";

const useObjectInfo = (
  setOpenCreateMeeting,
  setOpenCreateMyTask,
  setOpenCreateManagerTask,
  setDateCreateMyTask
) => {
  const dispatch = useDispatch()

  const handleCloseUpdateMeeting = () => {
    dispatch(setUpdateMeetingOpenState(false));
  };

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

  const handleCloseUpdateMyTask = () => {
    dispatch(setupdateMyTaskOpenState(false));
  };

  const handleCloseUpdateManagerTask = () => {
    dispatch(setUpdateManagerTaskOpenState(false));
  };
  return {
    handleOpenCreateMeeting,
    handleOpenCreateManagerTask,
    handleOpenCreateMyTask,
    handleCloseCreateMeeting,
    handleCloseCreateManagerTask,
    handleCloseCreateMyTask,
    handleCloseUpdateMeeting,
    handleCloseUpdateMyTask,
    handleCloseUpdateManagerTask
  };
};

export default useObjectInfo;
