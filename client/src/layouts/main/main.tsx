import dayjs from "dayjs";
import "dayjs/locale/ru";
import { Box } from "@mui/material";
import { ResponsiveLine } from "@nivo/line";
import { ResponsivePie } from "@nivo/pie";
import { useSelector } from "react-redux";
// components
import LayoutTitle from "../../components/common/page-titles/layout-title";
import BasicTable from "../../components/common/table/basic-table";
// utils
import { GetWeeklyObjects } from "../../utils/objects/get-weekly-objects";
import { GetWeeklyObjectsWithPhone } from "../../utils/objects/get-weekly-objects-with-phone";
// columns
import { resultMyColumns } from "../../columns/result-my-columns/result-my-columns";
import useTableHeader from "../../columns/result-my-columns/hooks/use-table-header";
// mock
import { objectStatusesArray } from "../../mock/object/object-status";
// store
import {
  getObjectsList,
  getObjectsLoadingStatus,
} from "../../store/object/objects.store";

const Main = () => {
  const isObjectsLoading = useSelector(getObjectsLoadingStatus());
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

  const theme = {
    axis: {
      fontSize: "14px",
      tickColor: "#eee",
      ticks: {
        line: {
          stroke: "#555555",
        },
        text: {
          fill: "#ffffff",
        },
      },
      legend: {
        text: {
          fill: "gray",
        },
      },
    },
    tooltip: {
      container: {
        background: "white",
        color: "black",
        borderRadius: "5px",
        padding: "8px",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.25)",
      },
    },
    grid: {
      line: {
        stroke: "#555555",
      },
    },
    crosshair: {
      line: {
        stroke: "#ffffff", // Устанавливаем цвет перекрестной линии при наведении
      },
    },
    legends: [
      {
        text: {
          fill: "white !important",
        },
      },
    ],
  };

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

  return (
    <>
      <LayoutTitle title="Главная" />
      <Box sx={{ display: "flex", height: "420px" }}>
        <Box sx={{ width: "60%", height: "400px" }}>
          <ResponsiveLine
            data={chartData}
            margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
            theme={theme}
            xScale={{ type: "point" }}
            yScale={{
              type: "linear",
              min: 0,
              max: "auto",
              stacked: true,
              reverse: false,
            }}
            yFormat=" >-.2f"
            curve="cardinal"
            axisTop={null}
            axisRight={null}
            axisBottom={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: "Период недели",
              legendOffset: 36,
              legendPosition: "middle",
            }}
            axisLeft={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: "Количество",
              legendOffset: -40,
              legendPosition: "middle",
            }}
            enableGridX={false}
            enableGridY={false}
            pointSize={10}
            pointColor={{ theme: "background" }}
            pointBorderWidth={2}
            pointBorderColor={{ from: "serieColor" }}
            pointLabelYOffset={-12}
            useMesh={true}
            legends={[
              {
                anchor: "bottom-right",
                direction: "column",
                justify: false,
                translateX: 100,
                translateY: 0,
                itemsSpacing: 0,
                itemDirection: "left-to-right",
                itemWidth: 80,
                itemHeight: 20,
                itemOpacity: 0.75,
                symbolSize: 12,
                symbolShape: "circle",
                symbolBorderColor: "rgba(0, 0, 0, .5)",
                effects: [
                  {
                    on: "hover",
                    style: {
                      itemBackground: "rgba(0, 0, 0, .03)",
                      itemOpacity: 1,
                    },
                  },
                ],
              },
            ]}
          />
        </Box>
        <Box sx={{ width: "40%", height: "450px", paddingTop: "10px" }}>
          <ResponsivePie
            data={pieData}
            margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
            innerRadius={0.5}
            padAngle={0.7}
            cornerRadius={3}
            activeOuterRadiusOffset={8}
            borderWidth={1}
            borderColor={{
              from: "color",
              modifiers: [["darker", 0.2]],
            }}
            arcLinkLabelsSkipAngle={10}
            arcLinkLabelsTextColor="#fff"
            arcLinkLabelsThickness={2}
            arcLinkLabelsColor={{ from: "color" }}
            arcLabelsSkipAngle={10}
            arcLabelsTextColor={{
              from: "color",
              modifiers: [["darker", 2]],
            }}
            tooltip={(segment) => {
              return (
                <div
                  style={{
                    background: segment?.datum?.color,
                    color: "black",
                    padding: "8px",
                    borderRadius: "5px",
                    boxShadow: "0 0 10px rgba(0, 0, 0, 0.25)",
                    border: "1px solid black",
                  }}
                >
                  {segment?.datum?.label}: {segment?.datum?.value}шт
                </div>
              );
            }}
          />
        </Box>
      </Box>

      <Box>
        <BasicTable
          items="1"
          itemsColumns={resultMyColumns}
          isLoading={isObjectsLoading}
          isPaginate={false}
        />
      </Box>
    </>
  );
};

export default Main;
