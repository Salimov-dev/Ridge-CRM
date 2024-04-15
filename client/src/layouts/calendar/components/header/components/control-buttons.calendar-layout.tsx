import dayjs from "dayjs";
import { Box, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { getMonthIndexState, setMonthIndex } from "@store/month-index.store";
import { getTaskLoadingStatus } from "@store/task/tasks.store";

const ControlButtons = () => {
  const monthIndex = useSelector(getMonthIndexState());
  const isTasksLoading = useSelector(getTaskLoadingStatus());

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
        disabled={isTasksLoading}
      >
        <ArrowBackIosIcon sx={{ color: "white " }} />
      </Button>
      <Button
        variant="outlined"
        color="success"
        onClick={handleToggleTodayMonth}
        disabled={isTasksLoading}
        sx={{ color: "white " }}
      >
        Сегодня
      </Button>
      <Button
        variant="outlined"
        color="success"
        onClick={handleToggleNextMonth}
        disabled={isTasksLoading}
        sx={{ color: "white " }}
      >
        <ArrowForwardIosIcon sx={{ color: "white !important" }} />
      </Button>
    </Box>
  );
};

export default ControlButtons;
