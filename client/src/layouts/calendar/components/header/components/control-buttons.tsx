import { Box, Button } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useDispatch, useSelector } from "react-redux";
import {
  getMonthIndexState,
  setMonthIndex,
} from "../../../../../store/month-index.store";
import dayjs from "dayjs";

const ControlButtons = () => {
  const monthIndex = useSelector(getMonthIndexState());
  const dispatch = useDispatch();

  const handleTogglePrevMonth = () => {
    dispatch(setMonthIndex(monthIndex - 1));
  };
  const handleToggleTodayMonth = () => {
    dispatch(setMonthIndex(dayjs().month()));
  };
  const handleToggleNextMonth = () => {
    dispatch(setMonthIndex(monthIndex + 1));
  };
  return (
    <Box sx={{ display: "flex", gap: "4px" }}>
      <Button
        variant="outlined"
        color="success"
        onClick={handleTogglePrevMonth}
      >
        <ArrowBackIosIcon />
      </Button>
      <Button
        variant="outlined"
        color="success"
        onClick={handleToggleTodayMonth}
      >
        Сегодня
      </Button>
      <Button
        variant="outlined"
        color="success"
        onClick={handleToggleNextMonth}
      >
        <ArrowForwardIosIcon />
      </Button>
    </Box>
  );
};

export default ControlButtons;
