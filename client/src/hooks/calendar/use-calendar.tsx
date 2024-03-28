import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import { useMemo } from "react";
import { orderBy } from "lodash";
import { useSelector } from "react-redux";
// store
import { getMeetingsList } from "@store/meeting/meetings.store";
import {
  getCurrentUserId,
  getIsUserCurator,
  getIsUserManager,
  getIsUserObserver
} from "@store/user/users.store";
// utils
import getStartWeekDate from "@utils/date/get-start-week-date";
import getEndWeekDate from "@utils/date/get-end-week-date";
import getMonth from "@utils/calendar/get-month";
// store
import { getTasksList } from "@store/task/tasks.store";
// hooks
import useSearchTask from "@hooks/task/use-search-task";

const useCalendar = (data, setState) => {
  dayjs.extend(isBetween);

  const currentUserId = useSelector(getCurrentUserId());
  const isCurator = useSelector(getIsUserCurator(currentUserId));
  const isObserver = useSelector(getIsUserObserver(currentUserId));
  const isManager = useSelector(getIsUserManager(currentUserId));

  const startOfWeek = getStartWeekDate();
  const endOfWeek = getEndWeekDate();

  const meetings = useSelector(getMeetingsList());
  const tasks = useSelector(getTasksList());

  // сортируем встречи
  const currentWeeklyMeetings = meetings?.filter((meet) =>
    dayjs(meet.date).isBetween(startOfWeek, endOfWeek, null, "[]")
  );
  const sortedCurrentWeeklyMeetings = useMemo(() => {
    return orderBy(currentWeeklyMeetings, ["date"], ["asc"]);
  }, [currentWeeklyMeetings]);

  // сортируем задачи
  const currentUserTasks = tasks?.filter(
    (task) => task?.userId === currentUserId
  );
  const getActualTasks = () => {
    if (isManager) {
      return tasks;
    }
    if (isCurator) {
      return currentUserTasks;
    }
    if (isObserver) {
      return currentUserTasks;
    }
  };
  const actualTasks = getActualTasks();
  const searchedTasks = useSearchTask(actualTasks, data);
  const sortedTasks = useMemo(() => {
    return orderBy(searchedTasks, ["date"], ["desc"]);
  }, [searchedTasks]);

  // ищем встречи
  const getMeeting = (day) => {
    const meeting = meetings?.filter(
      (meet) =>
        dayjs(meet?.date).format("YYYY-MM-DD") ===
        dayjs(day)?.format("YYYY-MM-DD")
    );
    const sortedMeetings = orderBy(meeting, ["date"], ["desc"]);

    return sortedMeetings;
  };

  // ищем задачи
  const getTask = (day) => {
    const currentTasks = actualTasks?.filter((task) => {
      const taskDate = dayjs(task?.date);
      const targetDate = dayjs(day);
      return (
        taskDate.format("YYYY-MM-DD") === targetDate.format("YYYY-MM-DD") &&
        taskDate.isSame(targetDate, "day")
      );
    });
    const sortedTasks = orderBy(
      currentTasks,
      [(task) => dayjs(task.time).format("HH:mm")],
      ["asc"]
    );

    return sortedTasks;
  };

  // обновление стейта при изменении даты текущего месяца календаря
  const handleChangeCurrentMonth = (monthIndex) => {
    setState((prevState) => ({
      ...prevState,
      currentMonth: getMonth(monthIndex)
    }));
  };

  return {
    sortedCurrentWeeklyMeetings,
    sortedTasks,
    actualTasks,
    getMeeting,
    getTask,
    handleChangeCurrentMonth
  };
};

export default useCalendar;
