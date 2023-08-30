// libraries
import dayjs from "dayjs";
import { Box, styled } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
// components
import MonthToday from "./components/month-today";
import ControlButtons from "./components/control-buttons";
import CreateTaskButton from "./components/create-task-button";
// store
import {
  getMonthIndexState,
  setMonthIndex,
} from "../../../../store/month-index.store";

const Component = styled(Box)`
  margin-bottom: 10px;
  display: flex;
  gap: 4px;
  justify-content: space-between;
`;

const Header = ({ onClick }) => {
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
    <Component>
      <CreateTaskButton onClick={onClick} />
      <MonthToday monthIndex={monthIndex} />
      <ControlButtons
        onPrev={handleTogglePrevMonth}
        onNext={handleToggleNextMonth}
        onToday={handleToggleTodayMonth}
      />
    </Component>
  );
};

export default Header;
