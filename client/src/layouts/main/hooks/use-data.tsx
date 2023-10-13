import { useSelector } from "react-redux";
import useTableHeader from "../../../columns/result-my-columns/hooks/use-table-header";
import { objectStatusesArray } from "../../../mock/object/object-status";
import { GetWeeklyObjects } from "../../../utils/objects/get-weekly-objects";
import { GetWeeklyObjectsWithPhone } from "../../../utils/objects/get-weekly-objects-with-phone";
import { getObjectsList } from "../../../store/object/objects.store";
import dayjs from "dayjs";

const useData = () => {
  const currentDate = dayjs();
  const objects = useSelector(getObjectsList());

  // текущая неделя месяца
  const startOfCurrentWeek = currentDate.startOf("week");
  const endOfCurrentWeek = currentDate.endOf("week").day(0);
  const currentWeek = `${startOfCurrentWeek.format(
    "DD.MM"
  )} - ${endOfCurrentWeek.format("DD.MM")}`;

  const weeklyObjects = GetWeeklyObjects(startOfCurrentWeek, endOfCurrentWeek);
  const weeklyObjectsWithPhone = GetWeeklyObjectsWithPhone(
    startOfCurrentWeek,
    endOfCurrentWeek
  );

  // предыдущая неделя месяца
  const previousWeek = useTableHeader(1);
  const endOfPrevWeek = currentDate.subtract(1, "week").endOf("week");
  const startOfPrevWeek = endOfPrevWeek.subtract(6, "day");

  const formattedStartPrevWeekDate = endOfPrevWeek.format("YYYY-MM-DD");
  const formattedEndPrevWeekDate = startOfPrevWeek.format("YYYY-MM-DD");
  const previousWeekObjects = GetWeeklyObjects(
    formattedStartPrevWeekDate,
    formattedEndPrevWeekDate
  );
  const previousWeekObjectsWithPhone = GetWeeklyObjectsWithPhone(
    formattedStartPrevWeekDate,
    formattedEndPrevWeekDate
  );

  // 3 неделя месяца
  const thirdWeek = useTableHeader(2);
  const startOfThirdWeek = currentDate.subtract(1, "week").endOf("week");
  const endOfThirdWeek = startOfThirdWeek.subtract(6, "day");

  const formattedStartNexDate = startOfThirdWeek.format("YYYY-MM-DD");
  const formattedEndNexDate = endOfThirdWeek.format("YYYY-MM-DD");
  const thirdWeekObjects = GetWeeklyObjects(
    formattedStartNexDate,
    formattedEndNexDate
  );
  const thirdWeekObjectsWithPhone = GetWeeklyObjectsWithPhone(
    formattedStartNexDate,
    formattedEndNexDate
  );

  // 4 неделя месяца
  const fourthWeek = useTableHeader(3);
  const startOFourthWeek = currentDate.subtract(3, "week").startOf("week");
  const endOFourthWeek = startOFourthWeek.add(6, "day");

  const formattedStarFourthDate = startOFourthWeek.format("YYYY-MM-DD");
  const formattedEnFourthDate = endOFourthWeek.format("YYYY-MM-DD");
  const fourthWeekObjects = GetWeeklyObjects(
    formattedStarFourthDate,
    formattedEnFourthDate
  );
  const fourthWeekObjectsWithPhone = GetWeeklyObjectsWithPhone(
    formattedStarFourthDate,
    formattedEnFourthDate
  );

  // объекты для отрисовки кривых линий
  const chartData = [
    {
      id: "Объекты",
      color: "hsl(313, 70%, 50%)",
      data: [
        {
          x: fourthWeek,
          y: fourthWeekObjects?.length,
        },
        {
          x: thirdWeek,
          y: thirdWeekObjects?.length,
        },
        {
          x: previousWeek,
          y: previousWeekObjects?.length,
        },
        {
          x: currentWeek,
          y: weeklyObjects?.length,
        },
      ],
    },
    {
      id: "С телефоном",
      color: "hsl(313, 70%, 50%)",
      data: [
        {
          x: fourthWeek,
          y: fourthWeekObjectsWithPhone?.length - fourthWeekObjects?.length,
        },
        {
          x: thirdWeek,
          y:
            thirdWeekObjectsWithPhone?.length -
            thirdWeekObjectsWithPhone?.length,
        },
        {
          x: previousWeek,
          y: previousWeekObjectsWithPhone?.length - previousWeekObjects?.length,
        },
        {
          x: currentWeek,
          y: weeklyObjectsWithPhone?.length - weeklyObjects?.length,
        },
      ],
    },
  ];

  // объекты для отрисовки пирога
  const usedStatuses = {};
  objects?.forEach((object) => {
    const statusId = object.status;
    if (
      statusId &&
      objectStatusesArray.some((status) => status._id === statusId)
    ) {
      if (usedStatuses[statusId]) {
        usedStatuses[statusId]++;
      } else {
        usedStatuses[statusId] = 1;
      }
    }
  });

  const filteredObjectStatuses = objectStatusesArray.filter(
    (status) => usedStatuses[status._id]
  );

  const pieData = filteredObjectStatuses.map((status) => {
    return {
      id: status.name,
      label: status.name,
      value: usedStatuses[status._id],
      color: `hsl(${Math.random() * 360}, 70%, 50%)`,
    };
  });
  return { chartData, pieData };
};

export default useData;
