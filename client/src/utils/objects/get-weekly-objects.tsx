import { useSelector } from "react-redux";
import { getObjectsList } from "../../store/object/objects.store";
import dayjs from "dayjs";


export const getWeeklyObjects = (startDate, endDate, items=null) => {
  const objects = useSelector(getObjectsList());

  const array = items ? items : objects
  return array?.filter((item) => {
    const createdAt = dayjs(item.created_at, {
      format: "YYYY-MM-DD",
    });

    return createdAt.isBetween(startDate, endDate, null, "[]");
  });
};
