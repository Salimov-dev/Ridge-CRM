import dayjs from "dayjs";
import { orderBy } from "lodash";
import { useSelector } from "react-redux";
import isBetween from 'dayjs/plugin/isBetween';
// store
import { getObjectsList } from "../../store/object/objects.store";
import { getMeetingsList } from "../../store/meeting/meetings.store";
import {
  getCurrentUserId,
  getIsUserCurator,
  getUsersList,
} from "../../store/user/users.store";
// utils
import getStartWeekDate from "../../utils/date/get-start-week-date";
import getEndWeekDate from "../../utils/date/get-end-week-date";

const useCalendar = () => {
  dayjs.extend(isBetween)
  const objects = useSelector(getObjectsList());
  const currentUserId = useSelector(getCurrentUserId());
  const isCurator = useSelector(getIsUserCurator(currentUserId));
  const users = useSelector(getUsersList());
  const meetings = useSelector(getMeetingsList());
  const startOfWeek = getStartWeekDate();
  const endOfWeek = getEndWeekDate();

  const currentWeeklyMeetings = meetings?.filter((meet) =>
    dayjs(meet.date).isBetween(startOfWeek, endOfWeek, null, "[]")
  );
  const usersWithoutCurrentUser = users?.filter(
    (user) => user?._id !== currentUserId
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
  const actualObjects = isCurator ? currentUserObjects : objects ;
  actualObjects?.forEach((obj) => {
    transformObjects?.push({ _id: obj._id, name: obj.location.address });
  });

  return {
    transformUsers,
    transformObjects,
    sortedCurrentWeeklyMeetings,
  };
};

export default useCalendar;
