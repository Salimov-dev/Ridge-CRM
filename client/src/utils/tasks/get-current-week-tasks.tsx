import dayjs from "dayjs";
import { useSelector } from "react-redux";
import { getTasksList } from "../../store/task/tasks.store";

export const getCurrentWeekTasks = () => {
  const tasks = useSelector(getTasksList());
  const currentDate = dayjs();

  const weeklyTasks = tasks?.filter((task) => {
    const createdAt = dayjs(task?.date);
    const startOfWeek = currentDate.startOf("week");
    const endOfWeek = currentDate.endOf("week");
    return createdAt.isBetween(startOfWeek, endOfWeek) && task.isDone !== true;
  });

  return weeklyTasks;
};
