import dayjs from "dayjs";
import { useMemo } from "react";
import { orderBy } from "lodash";
import { useSelector } from "react-redux";
import isBetween from "dayjs/plugin/isBetween";
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
import transformObjectsForSelect from "../../utils/objects/transform-objects-for-select";
import transformUsersForSelect from "../../utils/objects/transform-users-for-select";

const useCalendar = () => {
  dayjs.extend(isBetween);

  const currentUserId = useSelector(getCurrentUserId());
  const isCurator = useSelector(getIsUserCurator(currentUserId));

  const startOfWeek = getStartWeekDate();
  const endOfWeek = getEndWeekDate();

  // transformObjects
  const objects = useSelector(getObjectsList());
  const currentUserObjects = objects?.filter(
    (obj) => obj?.userId === currentUserId
  );
  const actualObjects = isCurator ? currentUserObjects : objects;
  const transformObjects = transformObjectsForSelect(actualObjects);

  // transformUsers
  const users = useSelector(getUsersList());
  const usersWithoutCurrentUser = users?.filter(
    (user) => user?._id !== currentUserId
  );
  const transformUsers = transformUsersForSelect(usersWithoutCurrentUser);

  // sortedCurrentWeeklyMeetings
  const meetings = useSelector(getMeetingsList());
  const currentWeeklyMeetings = meetings?.filter((meet) =>
    dayjs(meet.date).isBetween(startOfWeek, endOfWeek, null, "[]")
  );
  const sortedCurrentWeeklyMeetings = useMemo(() => {
    return orderBy(currentWeeklyMeetings, ["date"], ["asc"]);
  }, [currentWeeklyMeetings]);

  return {
    transformUsers,
    transformObjects,
    sortedCurrentWeeklyMeetings,
  };
};

export default useCalendar;
