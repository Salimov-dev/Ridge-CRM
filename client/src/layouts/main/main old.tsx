import { useSelector } from "react-redux";
import {
  getObjectsList,
  getObjectsLoadingStatus,
} from "../../store/object/objects.store";
import LayoutTitle from "../../components/common/page-titles/layout-title";
import BasicTable from "../../components/common/table/basic-table";
import { resultMyColumns } from "../../columns/result-my-columns/result-my-columns";
import { Box } from "@mui/material";
import { ResponsiveLine } from "@nivo/line";
import dayjs from "dayjs";
import "dayjs/locale/ru";
import useObjectData from "./hooks/useObjectData"; // Импортируйте ваш кастомный хук

const Main = () => {
  const objects = useSelector(getObjectsList());
  const isObjectsLoading = useSelector(getObjectsLoadingStatus());
  const columns = resultMyColumns;

  const currentMonth = dayjs();

  const calculateMonthCounts = (objects) => {
    const months = [];
    for (let i = 5; i >= 0; i--) {
      const month = currentMonth.subtract(i, "month");
      const monthName = month.locale("ru").format("MMMM");
      months.push(monthName);
    }

    const monthCounts = {};
    for (let i = 0; i < months.length; i++) {
      const monthName = months[i];
      monthCounts[monthName] = 0;
    }

    for (let i = 0; i < objects?.length; i++) {
      const object = objects[i];
      const createdAt = dayjs(object.created_at);
      const monthName = createdAt.locale("ru").format("MMMM");

      if (monthCounts.hasOwnProperty(monthName)) {
        monthCounts[monthName]++;
      }
    }

    return monthCounts;
  };

  const monthCounts = calculateMonthCounts(objects);
  const objectData = useObjectData(objects);
  // console.log("objectData", objectData);
  

  const chartData = Object.entries(monthCounts).map(([x, y]) => ({ x, y }));

  return (
    <>
      <LayoutTitle title="Главная" />
      {/* <Box sx={{ height: "300px" }}>
        <ResponsiveLine
          data={[
            {
              id: "Объекты",
              color: "hsl(313, 70%, 50%)",
              data: chartData.concat(objectData),
            },
          ]}
          margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
          xScale={{ type: "point" }}
          yScale={{
            type: "linear",
            min: "auto",
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
            legend: "transportation",
            legendOffset: 36,
            legendPosition: "middle",
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "count",
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
      </Box> */}
      {/* <Box>
        <BasicTable
          items="1"
          itemsColumns={columns}
          isLoading={isObjectsLoading}
          isPaginate={false}
        />
      </Box> */}
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
