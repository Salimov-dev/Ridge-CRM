import dayjs from "dayjs";
import { orderBy } from "lodash";
import { useDispatch, useSelector } from "react-redux";
// store
import { getObjectsList } from "../../store/object/objects.store";
import {
  getMeetingLoadingStatus,
  getMeetingsList,
} from "../../store/meeting/meetings.store";
import { getTaskLoadingStatus } from "../../store/task/tasks.store";
import { getCurrentUserId, getUsersList } from "../../store/user/users.store";
import { setupdateMyTaskOpenState } from "../../store/task/update-my-task.store";
import { setUpdateMeetingOpenState } from "../../store/meeting/update-meeting.store";
import { setUpdateManagerTaskOpenState } from "../../store/task/update-manager-task.store";
// utils
import getStartWeekDate from "../../utils/date/get-start-week-date";
import getEndWeekDate from "../../utils/date/get-end-week-date";

const useCalendar = (
  setOpenCreateManagerTask,
  setOpenCreateMyTask,
  setDateCreateMyTask,
  setOpenCreateMeeting
) => {
  const objects = useSelector(getObjectsList());
  const users = useSelector(getUsersList());
  const meetings = useSelector(getMeetingsList());
  const currentUserId = useSelector(getCurrentUserId());
  const isMeetingsLoading = useSelector(getMeetingLoadingStatus());
  const isTasksLoading = useSelector(getTaskLoadingStatus());
  const startOfWeek = getStartWeekDate();
  const endOfWeek = getEndWeekDate();
  const dispatch = useDispatch();

  const currentWeeklyMeetings = meetings?.filter((meet) =>
    dayjs(meet.date).isBetween(startOfWeek, endOfWeek, null, "[]")
  );
  const usersWithoutCurrentUser = users.filter(
    (user) => user._id !== currentUserId
  );
  const currentUserObjects = objects?.filter(
    (obj) => obj?.userId === currentUserId
  );
  const sortedCurrentWeeklyMeetings = orderBy(
    currentWeeklyMeetings,
    ["date"],
    ["asc"]
  );

  let transformUsers = [];
  usersWithoutCurrentUser?.forEach((user) => {
    transformUsers?.push({
      _id: user._id,
      name: `${user.name.lastName} ${user.name.firstName}`,
    });
  });

  let transformObjects = [];
  currentUserObjects?.forEach((obj) => {
    transformObjects?.push({ _id: obj._id, name: obj.location.address });
  });

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

  // manager tasks
  const handleOpenCreateManagerTask = () => {
    setOpenCreateManagerTask(true);
  };
  const handleCloseUpdateManagerTask = () => {
    dispatch(setUpdateManagerTaskOpenState(false));
  };
  const handleCloseCreateManagerTask = () => {
    setOpenCreateManagerTask(false);
  };

  // my tasks
  const handleOpenCreateMyTask = (day) => {
    const type = typeof day.date;
    setDateCreateMyTask(dayjs());
    setOpenCreateMyTask(true);
    if (type === "function") {
      setDateCreateMyTask(day);
    }
  };
  const handleCloseUpdateMyTask = () => {
    dispatch(setupdateMyTaskOpenState(false));
  };
  const handleCloseCreateMyTask = () => {
    setOpenCreateMyTask(false);
    setDateCreateMyTask(null);
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
