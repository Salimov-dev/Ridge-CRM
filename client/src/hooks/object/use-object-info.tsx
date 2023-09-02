import dayjs from "dayjs";
import { useDispatch } from "react-redux";
import { setUpdateMeetingOpenState } from "../../store/meeting/update-meeting.store";

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
  return {
    handleOpenCreateMeeting,
    handleOpenCreateManagerTask,
    handleOpenCreateMyTask,
    handleCloseCreateMeeting,
    handleCloseCreateManagerTask,
    handleCloseCreateMyTask,
    handleCloseUpdateMeeting
  };
};

export default useObjectInfo;
