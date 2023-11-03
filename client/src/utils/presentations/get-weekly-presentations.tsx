import { useSelector } from "react-redux";
import dayjs from "dayjs";
import { getPresentationsList } from "../../store/presentation/presentations.store";

export const getWeeklyPresentations = (startDate, endDate) => {
  const presentations = useSelector(getPresentationsList());

  return presentations?.filter((object) => {
    const createdAt = dayjs(object.created_at, {
      format: "YYYY-MM-DD",
    });

    return createdAt.isBetween(startDate, endDate, null, "[]");
  });
};
