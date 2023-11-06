import { Box, styled } from "@mui/material";
import CreateMyTaskButton from "../../../../components/UI/dialogs/buttons/create-my-task-button";
import CreateMeetingButton from "../../../../components/UI/dialogs/buttons/create-meeting-button";
import CreateManagerTaskButton from "../../../../components/UI/dialogs/buttons/create-manager-task-button";

const Component = styled(Box)`
  display: flex;
  gap: 4px;
`;

const CreateTasksButtons = ({
  isAuthorEntity = true,
}) => {
  return (
    <Component>
      {isAuthorEntity ? (
        <CreateMyTaskButton
          title="Поставить себе задачу"
          color="black"
          background="orange"
          isMyTask={true}
        />
      ) : null}
      {!isAuthorEntity ? (
        <CreateManagerTaskButton
          title="Поставить менеджеру задачу"
          background="Crimson"
        />
      ) : null}
    </Component>
  );
};

export default CreateTasksButtons;
