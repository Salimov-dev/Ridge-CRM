import dayjs from "dayjs";
import { orderBy } from "lodash";
import { useDispatch, useSelector } from "react-redux";
// store
import { getObjectsList } from "../../store/object/objects.store";
import {
  getMeetingLoadingStatus,
  getMeetingsList,
} from "../../store/meeting/meetings.store";
import { getCurrentUserId, getUsersList } from "../../store/user/users.store";
import {
  getTaskLoadingStatus,
} from "../../store/task/tasks.store";
import { setUpdateMeetingOpenState } from "../../store/meeting/update-meeting.store";
// utils
import getStartWeekDate from "../../utils/date/get-start-week-date";
import getEndWeekDate from "../../utils/date/get-end-week-date";
import { setupdateMyTaskOpenState } from "../../store/task/update-task.store";
import { setUpdateManagerTaskOpenState } from "../../store/task/update-manager-task.store";

const useCalendar = (
  setOpenCreateManagerTask,
  setOpenCreateMyTask,
  setDateCreateMyTask,
  setOpenCreateMeeting
) => {
  const objects = useSelector(getObjectsList());
  const meetings = useSelector(getMeetingsList());
  const isMeetingsLoading = useSelector(getMeetingLoadingStatus());
  const isTasksLoading = useSelector(getTaskLoadingStatus());

  const startOfWeek = getStartWeekDate();
  const endOfWeek = getEndWeekDate();

  const dispatch = useDispatch();

  const currentWeeklyMeetings = meetings?.filter((meet) =>
    dayjs(meet.date).isBetween(startOfWeek, endOfWeek, null, "[]")
  );

  const sortedCurrentWeeklyMeetings = orderBy(
    currentWeeklyMeetings,
    ["date"],
    ["asc"]
  );

  const users = useSelector(getUsersList());
  const currentUserId = useSelector(getCurrentUserId());
  const usersWithoutCurrentUser = users.filter(
    (user) => user._id !== currentUserId
  );

  let transformUsers = [];
  usersWithoutCurrentUser?.forEach((user) => {
    transformUsers?.push({
      _id: user._id,
      name: `${user.name.lastName} ${user.name.firstName}`,
    });
  });

  const currentUserObjects = objects?.filter(
    (obj) => obj?.userId === currentUserId
  );

  let transformObjects = [];
  currentUserObjects?.forEach((obj) => {
    transformObjects?.push({ _id: obj._id, name: obj.location.address });
  });

  const handleOpenCreateMeeting = () => {
    setOpenCreateMeeting(true);
  };

  const handleOpenCreateManagerTask = () => {
    setOpenCreateManagerTask(true);
  };

  const handleOpenCreateMyTask = (day) => {
    const type = typeof day.date;
    setDateCreateMyTask(dayjs());
    setOpenCreateMyTask(true);
    if (type === "function") {
      setDateCreateMyTask(day);
    }
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

  const handleCloseUpdateMeeting = () => {
    dispatch(setUpdateMeetingOpenState(false));
  };

  return {
    handleCloseCreateMyTask,
    handleCloseCreateManagerTask,
    handleCloseCreateMeeting,
    handleCloseUpdateMeeting,
    handleCloseUpdateMyTask,
    handleCloseUpdateManagerTask,
    handleOpenCreateMyTask,
    handleOpenCreateManagerTask,
    handleOpenCreateMeeting,
    isMeetingsLoading,
    isTasksLoading,
    sortedCurrentWeeklyMeetings,
    transformUsers,
    transformObjects,
  };
};

export default useCalendar;
