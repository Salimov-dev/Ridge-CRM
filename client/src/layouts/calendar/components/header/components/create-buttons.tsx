import { Box } from "@mui/material";
import CreateTaskButton from "./create-task-button";
import CreateMeetingButton from "./create-meeting-button";

const CreateButtons = ({ onCreateMeeting, onCreateMyTask, onCreateManagerTask }) => {
  return (
    <Box sx={{ display: "flex", gap: "4px" }}>
      <CreateTaskButton
        onClick={onCreateMyTask}
        title="Поставить себе задачу"
        color="black"
        background="orange"
        isMyTask={true}
      />
      <CreateTaskButton
        onClick={onCreateManagerTask}
        title="Поставить менеджеру задачу"
        background="red"
      />
      <CreateMeetingButton onOpen={onCreateMeeting} />
    </Box>
  );
};

export default CreateButtons;
