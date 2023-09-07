import { Typography, styled } from "@mui/material";

const Component = styled(Typography)`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 3px;
  width: 32px;
`;

const Date = ({day,isCurrentDay,isFutureDay,isWeekendColumn }) => {
  return (
    <Component
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "start",
        paddingTop: "3px",
        marginBottom: "10px",
        backgroundColor: isCurrentDay ? "yellow" : "inherit",
        color: isWeekendColumn
          ? "Crimson"
          : isCurrentDay
          ? "black"
          : isFutureDay
          ? "white"
          : "gray",
      }}
    >
      {day.format("DD")}
    </Component>
  );
};

export default Date;
