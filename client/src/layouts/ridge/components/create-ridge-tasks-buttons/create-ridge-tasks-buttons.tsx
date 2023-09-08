import { Box } from "@mui/material";
import CreateRidgeTaskButton from "../../../../components/UI/dialogs/buttons/create-ridge-task-button";

const CreateRidgeTasksButtons = () => {
  return (
    <Box sx={{ display: "flex", gap: "4px" }}>
      <CreateRidgeTaskButton
        title="Поставить задачу из грядки"
        color="white"
        background="darkGreen"
        isMyTask={true}
      />
    </Box>
  );
};

export default CreateRidgeTasksButtons;
