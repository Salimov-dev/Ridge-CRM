import { useSelector } from "react-redux";
import dayjs from "dayjs";
import { getPresentationsList } from "../../store/presentation/presentations.store";

export const getCurrentWeekPresentations = () => {
  const presentations = useSelector(getPresentationsList());
  const currentDate = dayjs();

  const weeklyPresentations = presentations?.filter((pres) => {
    const createdAt = dayjs(pres.created_at);
    const startOfWeek = currentDate.startOf('week');
    const endOfWeek = currentDate.endOf('week');
    return createdAt.isBetween(startOfWeek, endOfWeek);
  });

  return weeklyPresentations;
};
