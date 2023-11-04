import { Box, Typography, styled } from "@mui/material";
import { ResponsiveLine } from "@nivo/line";

const Charts = styled(Box)`
  width: 60%;
  height: 400px;
`;

const ChartLine = ({ data }) => {
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
    <Charts>
      <ResponsiveLine
        data={data}
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
  );
};

export default ChartLine;
