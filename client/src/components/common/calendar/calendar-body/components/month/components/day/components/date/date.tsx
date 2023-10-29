import { Box, Tooltip, Typography, styled } from "@mui/material";
import { useDispatch } from "react-redux";
import { setOpenSelectedDayOpenState } from "../../../../../../../../../../store/calendar/open-selected-day.store";

const Component = styled(Box)`
height: 28px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 3px;
  margin-bottom: 10px;
`;

const DateOfWeek = styled(Typography)`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 3px;
  width: 32px;
`;

const Date = ({
  day,
  setDateCreate,
  isCurrentDay,
  isFutureDay,
  isWeekendColumn,
}) => {
  const dispatch = useDispatch();

  const handleOpenSelectedDay = () => {
    dispatch<any>(setOpenSelectedDayOpenState(true));
    setDateCreate(day);
  };

  return (
    <Component>
       <Tooltip title="Открыть день подробнее" placement="top-start" arrow>
      <DateOfWeek
        onClick={() => handleOpenSelectedDay()}
        sx={{
          ":hover": {
            color: 'yellow',
            border: '1px solid yellow'
          },
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
      </DateOfWeek>
      </Tooltip>
    </Component>
  );
};

export default Date;
