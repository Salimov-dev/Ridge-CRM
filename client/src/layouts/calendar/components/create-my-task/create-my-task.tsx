import { Box } from "@mui/material";
import MyTaskForm from "../../../../components/common/forms/my-task-form/my-task-form";
import TitleWithCloseButton from "../../../../components/common/page-titles/title-with-close-button";

const CreateMyTask = ({ objects, objectPageId, title, onClose, date }) => {
  return (
    <Box>
      <TitleWithCloseButton title={title}  background="orange"
        color="white" onClose={onClose} />
      <MyTaskForm date={date} objects={objects} objectPageId={objectPageId} onClose={onClose} />
    </Box>
  );
};

export default CreateMyTask;
