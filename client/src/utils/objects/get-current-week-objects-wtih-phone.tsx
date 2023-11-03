import { useSelector } from "react-redux";
import { getObjectsList } from "../../store/object/objects.store";
import dayjs from "dayjs";

export const getCurrentWeekObjectsWithPhone = () => {
  const objects = useSelector(getObjectsList());
  const currentDate = dayjs();

  const weeklyObjectsWithPhone = objects?.filter((object) => {
    const createdAt = dayjs(object.created_at);
    const startOfWeek = currentDate.startOf("week");
    const endOfWeek = currentDate.endOf("week");
    const isWithinCurrentWeek = createdAt.isBetween(startOfWeek, endOfWeek);
    const hasPhone = object.contact && object.contact.phone;

    return isWithinCurrentWeek && hasPhone;
  });

  return weeklyObjectsWithPhone;
};
