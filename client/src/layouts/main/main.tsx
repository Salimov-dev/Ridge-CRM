import "dayjs/locale/ru";
import { Box, Typography, styled } from "@mui/material";
import { ResponsiveLine } from "@nivo/line";
import { ResponsivePie } from "@nivo/pie";
import { useSelector } from "react-redux";
// components
import LayoutTitle from "../../components/common/page-titles/layout-title";
import BasicTable from "../../components/common/table/basic-table";
// columns
import { resultMyColumns } from "../../columns/result-my-columns/result-my-columns";
// store
import { getObjectsLoadingStatus } from "../../store/object/objects.store";
// hooks
import useData from "./hooks/use-data";

const ChartsContainer = styled(Box)`
  display: flex;
  height: 420px;
`;

const Charts = styled(Box)`
  width: 60%;
  height: 400px;
`;

const Pie = styled(Box)`
  width: 40%;
  height: 450px;
  padding-top: 10px;
`;

const Main = () => {
  const isObjectsLoading = useSelector(getObjectsLoadingStatus());
  const { chartData, pieData, pieDataWithContacts } = useData();

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

  return (
    <>
      <LayoutTitle title="Главная" />
      <ChartsContainer>
        <Charts>
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
            tooltip={(point) => {
              return (
                <Box
                  sx={{
                    background: "white",
                    color: "black",
                    padding: "8px",
                    borderRadius: "5px",
                    boxShadow: "0 0 10px rgba(0, 0, 0, 0.25)",
                    border: "1px solid black",
                  }}
                >
                  <Typography>
                    <strong>Период:</strong> {point?.point?.data?.x}
                  </Typography>
                  <Typography>
                    <strong>Кол-во:</strong> {point?.point?.data?.yStacked}шт
                  </Typography>
                </Box>
              );
            }}
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
        </Charts>
        <Pie>
          <ResponsivePie
            data={pieDataWithContacts}
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
        </Pie>
        <Pie>
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
        </Pie>
      </ChartsContainer>

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
