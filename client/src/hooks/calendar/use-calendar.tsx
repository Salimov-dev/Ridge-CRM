import dayjs from "dayjs";
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
  const objects = useSelector(getObjectsList());
  const meetings = useSelector(getMeetingsList());
  const users = useSelector(getUsersList());

  const currentUserId = useSelector(getCurrentUserId());
  const isCurator = useSelector(getIsUserCurator(currentUserId));

  const startOfWeek = getStartWeekDate();
  const endOfWeek = getEndWeekDate();

  const currentWeeklyMeetings = meetings?.filter((meet) =>
    dayjs(meet.date).isBetween(startOfWeek, endOfWeek, null, "[]")
  );
  const sortedCurrentWeeklyMeetings = orderBy(
    currentWeeklyMeetings,
    ["date"],
    ["asc"]
  );

  const usersWithoutCurrentUser = users?.filter(
    (user) => user?._id !== currentUserId
  );
  const transformUsers = transformUsersForSelect(usersWithoutCurrentUser);

  const currentUserObjects = objects?.filter(
    (obj) => obj?.userId === currentUserId
  );
  const actualObjects = isCurator ? currentUserObjects : objects;
  const transformObjects = transformObjectsForSelect(actualObjects);

  return {
    transformUsers,
    transformObjects,
    sortedCurrentWeeklyMeetings,
  };
};

export default useCalendar;
