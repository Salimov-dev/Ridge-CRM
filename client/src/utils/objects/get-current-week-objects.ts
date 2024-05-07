import { useSelector } from "react-redux";
import { getObjectsList } from "../../store/object/objects.store";
import dayjs from "dayjs";

export const getCurrentWeekObjects = () => {
  const objects = useSelector(getObjectsList());
  const currentDate = dayjs();

  const weeklyObjects = objects?.filter((object) => {
    const createdAt = dayjs(object.created_at);
    const startOfWeek = currentDate.startOf("week");
    const endOfWeek = currentDate.endOf("week");
    return createdAt.isBetween(startOfWeek, endOfWeek);
  });

  return weeklyObjects;
};
