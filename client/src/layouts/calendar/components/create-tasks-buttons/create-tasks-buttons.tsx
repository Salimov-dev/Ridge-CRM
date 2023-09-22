import { Box } from "@mui/material";
import CreateMyTaskButton from "../../../../components/UI/dialogs/buttons/create-my-task-button";
import CreateMeetingButton from "../../../../components/UI/dialogs/buttons/create-meeting-button";
import CreateManagerTaskButton from "../../../../components/UI/dialogs/buttons/create-manager-task-button";

const CreateTasksButtons = ({ withoutMeeting = false, isAuthorEntity=true }) => {
  return (
    <Box sx={{ display: "flex", gap: "4px" }}>
      {isAuthorEntity ? <CreateMyTaskButton
        title="Поставить себе задачу"
        color="black"
        background="orange"
        isMyTask={true}
      /> : null}
      {!withoutMeeting ? <CreateMeetingButton /> : null}
      {!isAuthorEntity ? <CreateManagerTaskButton
        title="Поставить менеджеру задачу"
        background="Crimson"
      /> : null}
    </Box>
  );
};

export default CreateTasksButtons;
