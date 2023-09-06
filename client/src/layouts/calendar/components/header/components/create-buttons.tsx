import { Box } from "@mui/material";
import CreateMyTaskButton from "../../../../../components/UI/dialogs/buttons/create-my-task-button";
import CreateMeetingButton from "../../../../../components/UI/dialogs/buttons/create-meeting-button";
import CreateManagerTaskButton from "../../../../../components/UI/dialogs/buttons/create-manager-task-button";

const CreateButtons = () => {
  return (
    <Box sx={{ display: "flex", gap: "4px" }}>
      <CreateMyTaskButton
        title="Поставить себе задачу"
        color="black"
        background="orange"
        isMyTask={true}
      />
      <CreateManagerTaskButton
        title="Поставить менеджеру задачу"
        background="Crimson"
      />
      <CreateMeetingButton />
    </Box>
  );
};

export default CreateButtons;
