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
  const dispatch = useDispatch();

  // meetings
  const handleOpenCreateMeeting = () => {
    setOpenCreateMeeting(true);
  };
  const handleCloseUpdateMeeting = () => {
    dispatch(setUpdateMeetingOpenState(false));
  };
  const handleCloseCreateMeeting = () => {
    setOpenCreateMeeting(false);
  };

  // managers
  const handleOpenCreateManagerTask = () => {
    setOpenCreateManagerTask(true);
    setOpenCreateMyTask(false);
  };

  // my tasks
  const handleOpenCreateMyTask = () => {
    setDateCreateMyTask(dayjs());
    setOpenCreateMyTask(true);
  };
  const handleCloseUpdateManagerTask = () => {
    dispatch(setUpdateManagerTaskOpenState(false));
  };
  const handleCloseCreateMyTask = () => {
    setOpenCreateMyTask(false);
    setDateCreateMyTask(null);
  };

  // manager tasks
  const handleCloseCreateManagerTask = () => {
    setOpenCreateManagerTask(false);
  };
  const handleCloseUpdateMyTask = () => {
    dispatch(setupdateMyTaskOpenState(false));
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
    handleCloseUpdateManagerTask,
  };
};

export default useObjectInfo;
