import dayjs from "dayjs";
import { orderBy } from "lodash";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
// store
import { createTask } from "../store/task/tasks.store";
import { getObjectsList } from "../store/object/objects.store";
import {
  getMeetingLoadingStatus,
  getMeetingsList,
} from "../store/meeting/meetings.store";
import { getCurrentUserId, getUsersList } from "../store/user/users.store";
// utils
import { capitalizeFirstLetter } from "../utils/data/capitalize-first-letter";

const useCalendar = (
  data,
  setOpenCreateManagerTask,
  setOpenCreateMyTask,
  setValue,
  reset
) => {
  const dispatch = useDispatch();

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

  const handleopenCreateMyTaskManagerTask = () => {
    setOpenCreateManagerTask(true);
  };

  const handleopenCreateMyTaskMyTask = () => {
    setOpenCreateMyTask(true);
  };

  const handleCloseCreateMyTask = () => {
    setOpenCreateMyTask(false);
    setValue("date", null);
    reset();
  };

  const handleCloseCreateManagerTask = () => {
    setOpenCreateManagerTask(false);
    setValue("date", null);
    reset();
  };

  const onSubmitManagerTask = () => {
    const newData = {
      ...data,
      comment: capitalizeFirstLetter(data.comment),
    };
    dispatch(createTask(newData))
      .then(handleCloseCreateManagerTask())
      .then(toast.success("Задача успешно создана!"));
  };

  const onSubmitMyTask = () => {
    const newData = {
      ...data,
      comment: capitalizeFirstLetter(data.comment),
      managerId: null,
    };
    dispatch(createTask(newData))
      .then(handleCloseCreateMyTask())
      .then(toast.success("Задача успешно создана!"));
  };

  return {
    onSubmitMyTask,
    onSubmitManagerTask,
    handleCloseCreateMyTask,
    handleCloseCreateManagerTask,
    handleopenCreateMyTaskMyTask,
    handleopenCreateMyTaskManagerTask,
    isMeetingsLoading,
    meetings: sortedCurrentWeeklyMeetings,
    users: transformUsers,
    objects: transformObjects,
  };
};

export default useCalendar;
