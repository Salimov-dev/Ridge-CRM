import { useSelector } from "react-redux";
import dayjs from "dayjs";
import { getPresentationsList } from "../../store/presentation/presentations.store";

export const getWeeklyPresentations = (startDate, endDate, items) => {
  const presentations = useSelector(getPresentationsList());

  const array = items ? items : presentations

  return array?.filter((object) => {
    const createdAt = dayjs(object.created_at, {
      format: "YYYY-MM-DD",
    });

    return createdAt.isBetween(startDate, endDate, null, "[]");
  });
};
