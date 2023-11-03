import { Box, Tooltip, styled } from "@mui/material";

const Component = styled(Box)`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: end;
  gap: 5px;
`;

const LastContantFlag = styled(Box)`
  width: 10px;
  height: 10px;
  background: SaddleBrown;
  border-radius: 50%;
  border: 1px solid gray;
`;

const MeetingFlag = styled(Box)`
  width: 10px;
  height: 10px;
  background: RoyalBlue;
  border-radius: 50%;
  border: 1px solid gray;
`;

const TaskFlag = styled(Box)`
  width: 10px;
  height: 10px;
  background: orange;
  border-radius: 50%;
  border: 1px solid orange;
`;

const Flags = ({
  meetings = [],
  tasks = [],
  lastContacts = [],
  onClick = () => {},
}) => {
  return (
    <Component>
      {lastContacts?.length ? (
        <Tooltip title="Есть последний контакт" placement="top-start" arrow>
          <LastContantFlag onClick={onClick}></LastContantFlag>
        </Tooltip>
      ) : null}
      {meetings?.length ? (
        <Tooltip title="Есть встречи" placement="top-start" arrow>
          <MeetingFlag onClick={onClick}></MeetingFlag>
        </Tooltip>
      ) : null}
      {tasks?.length ? (
        <Tooltip title="Есть задачи" placement="top-start" arrow>
          <TaskFlag onClick={onClick}></TaskFlag>
        </Tooltip>
      ) : null}
    </Component>
  );
};

export default Flags;
