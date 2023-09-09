import dayjs from "dayjs";
import { useMemo } from "react";
// utils
import getStartWeekDate from "../../utils/date/get-start-week-date";
import getEndWeekDate from "../../utils/date/get-end-week-date";

const useSearchTask = (tasks, data) => {
  const startWeek = getStartWeekDate();
  const endWeek = getEndWeekDate();

  const searchedTasks = useMemo(() => {
    let array = tasks;

    if (data?.task) {
      array = array?.filter((task) =>
        task?.comment.toLowerCase().includes(data?.task.toLowerCase())
      );
    }

    if (data?.result) {
      array = array?.filter((task) =>
        task?.result?.toLowerCase().includes(data?.result?.toLowerCase())
      );
    }

    // Все актуальные
    if (data.selectedTaskTypes === "234gsfd345kgdsl23gf344") {
      array = array?.filter((task) => task?.isDone !== true);
    }

    // Актуальные на этой неделе
    if (data.selectedTaskTypes === "0543sadf23gdfs32423432") {
      array = array?.filter(
        (task) =>
          dayjs(task.date).isBetween(startWeek, endWeek) &&
          task?.isDone !== true
      );
    }

    // Выполненные на этой неделе
    if (data.selectedTaskTypes === "9345ghfdxzws9765gf2342") {
      array = array?.filter(
        (task) =>
          task?.isDone === true &&
          dayjs(task.date).isBetween(startWeek, endWeek)
      );
    }

    // Выполненные за всё время
    if (data.selectedTaskTypes === "09432gdfsjk435gdsf3454") {
      array = array?.filter((task) => task?.isDone === true);
    }

    if (data.onlyMyTasks) {
      array = array?.filter(
        (task) => task.hasOwnProperty("managerId") && task.managerId !== null
      );
    }

    return array;
  }, [data, tasks]);

  return searchedTasks;
};

export default useSearchTask;
