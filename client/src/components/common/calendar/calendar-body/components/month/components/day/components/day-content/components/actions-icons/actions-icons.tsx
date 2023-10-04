import { Box, styled } from "@mui/material";
import CreateMeetingIcon from "./components/create-meeting-icon";
import CreateMyTaskIcon from "./components/create-my-task-icon";
import CreateManagerTaskIcon from "./components/create-manager-task-icon";
import {
  getIsUserCurator,
} from "../../../../../../../../../../../../store/user/users.store";
import { useSelector } from "react-redux";

const ActionsContainer = styled(Box)`
  width: 100%;
  display: flex;
  justify-content: end;
`;

const ActionsIcons = ({ day, setDateCreate, isCurrentDay, isFutureDay }) => {
  const isCurator = useSelector(getIsUserCurator());

  return (
    <ActionsContainer>
      <>
        {isCurator ? (
          <CreateManagerTaskIcon
            day={day}
            isCurrentDay={isCurrentDay}
            isFutureDay={isFutureDay}
            setDateCreate={setDateCreate}
            hoverColor="FireBrick"
          />
        ) : null}
        <CreateMeetingIcon
          day={day}
          isCurrentDay={isCurrentDay}
          isFutureDay={isFutureDay}
          setDateCreate={setDateCreate}
        />
      </>
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
