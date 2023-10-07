import dayjs from "dayjs";
import { useState, useEffect } from "react";

const useObjectData = (objects) => {
  const [objectData, setObjectData] = useState([]);

  useEffect(() => {
    const currentMonth = dayjs();
    const calculateObjectData = () => {
      let weekStart = currentMonth.startOf("month").startOf("week").add(1, "day");
      let weekEnd = weekStart.endOf("week").add(1, "day");
      const objectData = [];

      for (let i = 0; i < 5; i++) {
        const formattedWeekStart = weekStart.locale("ru").format("DD.MM");
        const formattedWeekEnd = weekEnd.locale("ru").format("DD.MM");

        const weeklyObjects = objects?.filter((obj) => {
          const createdAt = dayjs(obj?.created_at);
          return createdAt.isBetween(weekStart, weekEnd, null, "[]");
        });

        const weeklyObjectsQuantity = weeklyObjects?.length;
        objectData.push({
          x: `${formattedWeekStart}-${formattedWeekEnd}`,
          y: weeklyObjectsQuantity || 0,
        });

        weekStart = weekStart.add(1, "week");
        weekEnd = weekEnd.add(1, "week");
      }

      return objectData;
    };

    const calculatedObjectData = calculateObjectData();
    setObjectData(calculatedObjectData);
  }, [objects]);

  return objectData;
};

export default useObjectData;
