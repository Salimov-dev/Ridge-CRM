import dayjs from "dayjs";
// columns
import useTableHeader from "@columns/statictics-columns/hooks/use-table-header";
// data
import { objectStatusesArray } from "@data/object/object-status";
// utils
import { getWeeklyObjects } from "@utils/objects/get-weekly-objects";

const useChartsStatisticsData = (objects) => {
  const currentDate = dayjs();

  // текущая неделя месяца
  const startOfCurrentWeek = currentDate.startOf("week");
  const endOfCurrentWeek = currentDate.endOf("week").day(0);
  const currentWeek = `${startOfCurrentWeek.format(
    "DD.MM"
  )} - ${endOfCurrentWeek.format("DD.MM")}`;

  const weeklyObjects = getWeeklyObjects(
    startOfCurrentWeek,
    endOfCurrentWeek,
    objects
  );

  // предыдущая неделя месяца
  const previousWeek = useTableHeader(1);
  const endOfPrevWeek = currentDate.subtract(1, "week").endOf("week");
  const startOfPrevWeek = endOfPrevWeek.subtract(6, "day");

  const formattedStartPrevWeekDate = endOfPrevWeek.format("YYYY-MM-DD");
  const formattedEndPrevWeekDate = startOfPrevWeek.format("YYYY-MM-DD");
  const previousWeekObjects = getWeeklyObjects(
    formattedStartPrevWeekDate,
    formattedEndPrevWeekDate,
    objects
  );

  // 3 неделя месяца
  const thirdWeek = useTableHeader(2);
  const startOfThirdWeek = currentDate.subtract(1, "week").endOf("week");
  const endOfThirdWeek = startOfThirdWeek.subtract(6, "day");

  const formattedStartNexDate = startOfThirdWeek.format("YYYY-MM-DD");
  const formattedEndNexDate = endOfThirdWeek.format("YYYY-MM-DD");
  const thirdWeekObjects = getWeeklyObjects(
    formattedStartNexDate,
    formattedEndNexDate,
    objects
  );

  // 4 неделя месяца
  const fourthWeek = useTableHeader(3);
  const startOFourthWeek = currentDate.subtract(3, "week").startOf("week");
  const endOFourthWeek = startOFourthWeek.add(6, "day");

  const formattedStarFourthDate = startOFourthWeek.format("YYYY-MM-DD");
  const formattedEnFourthDate = endOFourthWeek.format("YYYY-MM-DD");
  const fourthWeekObjects = getWeeklyObjects(
    formattedStarFourthDate,
    formattedEnFourthDate,
    objects
  );

  // объекты для отрисовки кривых линий
  const chartData = [
    {
      id: "Объекты",
      color: "hsl(313, 70%, 50%)",
      data: [
        {
          x: fourthWeek,
          y: fourthWeekObjects?.length
        },
        {
          x: thirdWeek,
          y: thirdWeekObjects?.length
        },
        {
          x: previousWeek,
          y: previousWeekObjects?.length
        },
        {
          x: currentWeek,
          y: weeklyObjects?.length
        }
      ]
    }
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

  const filteredObjectStatuses = objectStatusesArray?.filter(
    (status) => usedStatuses[status._id]
  );

  const pieData = filteredObjectStatuses?.map((status) => {
    return {
      id: status.name,
      label: status.name,
      value: usedStatuses[status._id],
      color: `hsl(${Math.random() * 360}, 70%, 50%)`
    };
  });

  return { chartData, pieData };
};

export default useChartsStatisticsData;
