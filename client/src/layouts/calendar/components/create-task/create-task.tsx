import { Box } from "@mui/material";
import TaskForm from "../../../../components/common/forms/task-form/task-form";
import TitleWithCloseButton from "../../../../components/common/page-titles/title-with-close-button";

const CreateTask = ({
  data,
  title,
  objects,
  users,
  register,
  onSubmit,
  handleSubmit,
  errors,
  setValue,
  onClose,
  isValid,
  isManagerTask
}) => {
  return (
    <Box>
      <TitleWithCloseButton title={title} onClose={onClose} />
      <TaskForm
        data={data}
        objects={objects}
        users={users}
        register={register}
        onSubmit={onSubmit}
        handleSubmit={handleSubmit}
        errors={errors}
        setValue={setValue}
        onClose={onClose}
        isValid={isValid}
        isManagerTask={isManagerTask}
      />
    </Box>
  );
};

export default CreateTask;
