import { useSelector } from "react-redux";
import { getObjectsList } from "../../store/object/objects.store";
import dayjs from "dayjs";

export const GetWeeklyObjectsWithPhone = (startDate, endDate) => {
  const objects = useSelector(getObjectsList());

  return objects?.filter((object) => {
    const createdAt = dayjs(object.created_at, {
      format: "YYYY-MM-DD",
    });
    const isWithinCurrentWeek = createdAt.isBetween(
      startDate,
      endDate,
      null,
      "[]"
    );
    const hasPhone = object.contact && object.contact.phone;

    return isWithinCurrentWeek && hasPhone;
  });
};
