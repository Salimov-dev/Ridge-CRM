import { Box, styled } from "@mui/material";
import CreateMeetingIcon from "./components/create-meeting-icon";
import CreateMyTaskIcon from "./components/create-my-task-icon";
import CreateManagerTaskIcon from "./components/create-manager-task-icon";

const ActionsContainer = styled(Box)`
  width: 100%;
  display: flex;
  justify-content: end;
`;

const ActionsIcons = ({
  day,
  setDateCreate,
  isCurrentDay,
  isFutureDay,
  isRidgePage,
}) => {
  return (
    <ActionsContainer>
      {!isRidgePage ? (
        <>
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
        </>
      ) : null}
      <CreateMyTaskIcon
        day={day}
        isCurrentDay={isCurrentDay}
        isFutureDay={isFutureDay}
        setDateCreate={setDateCreate}
        hoverColor="orange"
        isRidgePage={isRidgePage}
      />
    </ActionsContainer>
  );
};

export default ActionsIcons;
