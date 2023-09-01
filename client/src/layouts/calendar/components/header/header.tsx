// libraries
import { Box, styled } from "@mui/material";
import { useSelector } from "react-redux";
// components
import MonthToday from "./components/month-today";
import CreateButtons from "./components/create-buttons";
import ControlButtons from "./components/control-buttons";
// store
import { getMonthIndexState } from "../../../../store/month-index.store";

const Component = styled(Box)`
  margin-bottom: 6px;
  display: flex;
  gap: 4px;
  justify-content: space-between;
`;

const Header = ({ onCreateMyTask, onCreateManagerTask, onCreateMeeting }) => {
  const monthIndex = useSelector(getMonthIndexState());

  return (
    <Component>
      <CreateButtons
        onCreateMeeting={onCreateMeeting}
        onCreateMyTask={onCreateMyTask}
        onCreateManagerTask={onCreateManagerTask}
      />
      <MonthToday monthIndex={monthIndex} />
      <ControlButtons />
    </Component>
  );
};

export default Header;