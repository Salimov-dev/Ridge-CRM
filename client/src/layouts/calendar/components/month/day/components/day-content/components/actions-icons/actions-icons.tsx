import { Box, styled } from "@mui/material";
import CreateMeetingIcon from "../create-meeting-icon/create-meeting-icon";
import CreateMyTaskIcon from "../create-my-task-icon/create-my-task-icon";
import CreateManagerTaskIcon from "../create-manager-task-icon/create-manager-task-icon";

const ActionsContainer = styled(Box)`
  width: 100%;
  display: flex;
  justify-content: end;
`;

const ActionsIcons = ({day, setDateCreate, isCurrentDay, isFutureDay}) => {
  return (
    <ActionsContainer>
      <CreateManagerTaskIcon
        day={day}
        isCurrentDay={isCurrentDay}
        isFutureDay={isFutureDay}
        setDateCreate={setDateCreate}
        hoverColor="FireBrick"
      />
      <CreateMeetingIcon
        day={day}
        isCurrentDay={isCurrentDay}
        isFutureDay={isFutureDay}
        setDateCreate={setDateCreate}
      />
      <CreateMyTaskIcon
        day={day}
        isCurrentDay={isCurrentDay}
        isFutureDay={isFutureDay}
        setDateCreate={setDateCreate}
        hoverColor="orange"
      />
    </ActionsContainer>
  );
};

export default ActionsIcons;
