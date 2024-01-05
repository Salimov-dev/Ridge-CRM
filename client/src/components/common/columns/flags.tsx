import { useTheme } from "@emotion/react";
import { Box, Tooltip, styled } from "@mui/material";
import { tokens } from "@theme/theme";

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
  border-radius: 50%;
  border: 1px solid gray;
`;

const MeetingFlag = styled(Box)`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  border: 1px solid gray;
`;

const TaskFlag = styled(Box)`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  border: 1px solid orange;
`;

const Flags = ({
  meetings = [],
  tasks = [],
  lastContacts = [],
  onClick = () => {},
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Component>
      {lastContacts?.length ? (
        <Tooltip title="Есть последний контакт" placement="top-start" arrow>
          <LastContantFlag
            onClick={onClick}
            sx={{ background: colors.lastContact["primary"] }}
          ></LastContantFlag>
        </Tooltip>
      ) : null}
      {meetings?.length ? (
        <Tooltip title="Есть встречи" placement="top-start" arrow>
          <MeetingFlag
            onClick={onClick}
            sx={{ background: colors.meeting["primary"] }}
          ></MeetingFlag>
        </Tooltip>
      ) : null}
      {tasks?.length ? (
        <Tooltip title="Есть задачи" placement="top-start" arrow>
          <TaskFlag
            onClick={onClick}
            sx={{ background: colors.task["myTask"] }}
          ></TaskFlag>
        </Tooltip>
      ) : null}
    </Component>
  );
};

export default Flags;
