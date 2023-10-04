import { Box, Button } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useDispatch, useSelector } from "react-redux";
import {
  getMonthIndexState,
  setMonthIndex,
} from "../../../../../store/month-index.store";
import dayjs from "dayjs";

const ControlButtons = ({isLoading}) => {
  const monthIndex = useSelector(getMonthIndexState());

  const dispatch = useDispatch();

  const handleTogglePrevMonth = () => {
    dispatch<any>(setMonthIndex(monthIndex - 1));
  };
  const handleToggleTodayMonth = () => {
    dispatch<any>(setMonthIndex(dayjs().month()));
  };
  const handleToggleNextMonth = () => {
    dispatch<any>(setMonthIndex(monthIndex + 1));
  };
  return (
    <Box sx={{ display: "flex", gap: "4px" }}>
      <Button
        variant="outlined"
        color="success"
        onClick={handleTogglePrevMonth}
        disabled={!isLoading}
      >
        <ArrowBackIosIcon />
      </Button>
      <Button
        variant="outlined"
        color="success"
        onClick={handleToggleTodayMonth}
        disabled={!isLoading}
      >
        Сегодня
      </Button>
      <Button
        variant="outlined"
        color="success"
        onClick={handleToggleNextMonth}
        disabled={!isLoading}
      >
        <ArrowForwardIosIcon />
      </Button>
    </Box>
  );
};

export default ControlButtons;
