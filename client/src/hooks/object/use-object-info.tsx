import dayjs from "dayjs";
import { useDispatch } from "react-redux";
import { setUpdateMeetingOpenState } from "../../store/meeting/update-meeting.store";
import { setUpdateMyTaskOpenState } from "../../store/task/update-my-task.store";
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
  const handleCloseCreateMyTask = () => {
    setOpenCreateMyTask(false);
    setDateCreateMyTask(null);
  };

  // manager tasks
  const handleCloseCreateManagerTask = () => {
    setOpenCreateManagerTask(false);
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
