import { tokens } from "@theme/theme";
import { Dispatch, FC, SetStateAction } from "react";
import { useSelector } from "react-redux";
import { useTheme } from "@emotion/react";
import { Box, Tooltip, styled } from "@mui/material";
// dialogs
import objectsDialogsState from "@dialogs/dialog-handlers/objects.dialog-handlers";
// interfaces
import { ILastContact } from "@interfaces/last-contact/last-contact.interface";
import { IDialogPagesState } from "@interfaces/state/dialog-pages-state.interface";
import { ITask } from "@interfaces/task/task.interface";
// store
import { getLastContactsList } from "@store/last-contact/last-contact.store";
import { getObjectMeetingsList } from "@store/meeting/meetings.store";
import { getTasksList } from "@store/task/tasks.store";

interface FlagsProps {
  objectId: string;
  setState: Dispatch<SetStateAction<IDialogPagesState>>;
}

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

const Flags: FC<FlagsProps> = ({ objectId, setState }): JSX.Element => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const meetings = useSelector(getObjectMeetingsList(objectId));

  const tasksList = useSelector(getTasksList());
  const tasks = tasksList?.filter((task: ITask) => task.objectId === objectId);

  const lastContactsList = useSelector(getLastContactsList());
  const lastContacts = lastContactsList?.filter(
    (contact: ILastContact) => contact.objectId === objectId
  );

  const { handleOpenObjectPage } = objectsDialogsState({ setState });

  return (
    <Component>
      {lastContacts?.length ? (
        <Tooltip title="Есть последний контакт" placement="top-start" arrow>
          <LastContantFlag
            onClick={() => handleOpenObjectPage(objectId)}
            sx={{ background: colors.lastContact["primary"] }}
          ></LastContantFlag>
        </Tooltip>
      ) : null}

      {meetings?.length ? (
        <Tooltip title="Есть встречи" placement="top-start" arrow>
          <MeetingFlag
            onClick={() => handleOpenObjectPage(objectId)}
            sx={{ background: colors.meeting["primary"] }}
          ></MeetingFlag>
        </Tooltip>
      ) : null}

      {tasks?.length ? (
        <Tooltip title="Есть задачи" placement="top-start" arrow>
          <TaskFlag
            onClick={() => handleOpenObjectPage(objectId)}
            sx={{ background: colors.task["myTask"] }}
          ></TaskFlag>
        </Tooltip>
      ) : null}
    </Component>
  );
};

export default Flags;
