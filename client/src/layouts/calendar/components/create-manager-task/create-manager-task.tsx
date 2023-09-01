import { Box } from "@mui/material";
import TitleWithCloseButton from "../../../../components/common/page-titles/title-with-close-button";
import ManagerTaskForm from "../../../../components/common/forms/manager-task-form/manager-task-form";

const CreateManagerTask = ({
  objects,
  users,
  title,
  onClose,
  objectPageId,
}) => {
  return (
    <Box>
      <TitleWithCloseButton
        title={title}
        background="red"
        color="white"
        onClose={onClose}
      />
      <ManagerTaskForm
        objects={objects}
        users={users}
        onClose={onClose}
        objectPageId={objectPageId}
      />
    </Box>
  );
};

export default CreateManagerTask;
