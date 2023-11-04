import { Box, styled } from "@mui/material";
import { ResponsivePie } from "@nivo/pie";

const Component = styled(Box)`
  width: 40%;
  height: 450px;
  padding-top: 10px;
`;

const PieStyled = ({ data }) => {
  return (
    <Component>
      <ResponsivePie
        data={data}
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
    </Component>
  );
};

export default PieStyled;
