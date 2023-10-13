import { useSelector } from "react-redux";
import { getObjectsList } from "../../store/object/objects.store";
import dayjs from "dayjs";

export const GetWeeklyObjects = (startDate, endDate) => {
  const objects = useSelector(getObjectsList());

  return objects?.filter((object) => {
    const createdAt = dayjs(object.created_at, {
      format: "YYYY-MM-DD",
    });

    return createdAt.isBetween(startDate, endDate, null, "[]");
  });
};