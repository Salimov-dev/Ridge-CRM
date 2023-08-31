import dayjs from "dayjs";
import { orderBy } from "lodash";
import { useSelector } from "react-redux";
// store
import { getObjectsList } from "../store/object/objects.store";
import {
  getMeetingLoadingStatus,
  getMeetingsList,
} from "../store/meeting/meetings.store";
import { getCurrentUserId, getUsersList } from "../store/user/users.store";

const useCalendar = (
  setOpenCreateManagerTask,
  setOpenCreateMyTask,
  setDateCreateMyTask,
  setOpenCreateMeeting
) => {
  const objects = useSelector(getObjectsList());
  const meetings = useSelector(getMeetingsList());
  const isMeetingsLoading = useSelector(getMeetingLoadingStatus());

  const today = dayjs();
  const startOfWeek = today.startOf("week");
  const endOfWeek = today.endOf("week");

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

  const handleOpenCreateMyTaskManagerTask = () => {
    setOpenCreateManagerTask(true);
    setOpenCreateMyTask(false);
  };

  const handleOpenCreateMyTask = (day) => {
    const type = typeof day.date;
    setDateCreateMyTask(dayjs());
    setOpenCreateMyTask(true);
    setOpenCreateManagerTask(false);
    if (type === "function") {
      setDateCreateMyTask(day);
    }
  };

  const handleCloseCreateMyTask = () => {
    setOpenCreateMyTask(false);
    setDateCreateMyTask(null);
    setOpenCreateManagerTask(false);
  };

  const handleCloseCreateManagerTask = () => {
    setOpenCreateManagerTask(false);
    setOpenCreateMyTask(false);
  };

  const handleOpenCreateMeeting = () => {
    setOpenCreateMeeting(true);
  };

  const handleCloseCreateMeeting = () => {
    setOpenCreateMeeting(false);
  };

  return {
    handleCloseCreateMyTask,
    handleCloseCreateManagerTask,
    handleCloseCreateMeeting,
    handleOpenCreateMyTask,
    handleOpenCreateMyTaskManagerTask,
    handleOpenCreateMeeting,
    isMeetingsLoading,
    meetings: sortedCurrentWeeklyMeetings,
    users: transformUsers,
    objects: transformObjects,
  };
};

export default useCalendar;
