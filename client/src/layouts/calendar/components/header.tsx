import { Box, Button, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  getMonthIndexState,
  setMonthIndex,
} from "../../../store/month-index.store";
import dayjs from "dayjs";
import "dayjs/locale/ru";
import { capitalizeFirstLetter } from "../../../utils/data/capitalize-first-letter";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const Header = () => {
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
    <Box
      sx={{
        marginBottom: "10px",
        display: "flex",
        gap: "4px",
        justifyContent: "space-between",
      }}
    >
    

      <Typography variant="h2">
        {capitalizeFirstLetter(
          dayjs(new Date(dayjs().year(), monthIndex))
            .locale("ru")
            .format("MMMM YYYY")
        )}
      </Typography>

      <Box sx={{ display: "flex", gap: "4px" }}>
        <Button
          variant="outlined"
          color="success"
          onClick={handleTogglePrevMonth}
        >
          <ArrowBackIosIcon/>
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
          <ArrowForwardIosIcon/>
        </Button>
      </Box>
    </Box>
  );
};

export default Header;
