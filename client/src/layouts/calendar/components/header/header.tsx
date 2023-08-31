// libraries
import { Box, styled } from "@mui/material";
import { useSelector } from "react-redux";
// components
import MonthToday from "./components/month-today";
import ControlButtons from "./components/control-buttons";
import CreateTaskButton from "./components/create-task-button";
// store
import { getMonthIndexState } from "../../../../store/month-index.store";

const Component = styled(Box)`
  margin-bottom: 10px;
  display: flex;
  gap: 4px;
  justify-content: space-between;
`;

const Header = ({ onClick }) => {
  const monthIndex = useSelector(getMonthIndexState());

  return (
    <Component>
      <CreateTaskButton onClick={onClick} />
      <MonthToday monthIndex={monthIndex} />
      <ControlButtons />
    </Component>
  );
};

export default Header;
