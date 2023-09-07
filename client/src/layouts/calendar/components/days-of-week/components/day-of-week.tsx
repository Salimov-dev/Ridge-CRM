import { Box, Typography, styled } from "@mui/material";

const Component = styled(Box)`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const DayOfWeek = ({ day, color }) => {
  return (
    <Component>
      <Typography sx={{ color: color, fontWeight: "800" }}>{day}</Typography>
    </Component>
  );
};

export default DayOfWeek;
