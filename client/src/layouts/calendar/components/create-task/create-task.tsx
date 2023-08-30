import { Box, Typography } from "@mui/material";
import TaskForm from "../../../../components/common/forms/task-form/task-form";
import TitleWithCloseButton from "../../../../components/common/page-titles/title-with-close-button";

const CreateTask = ({
  data,
  objects,
  register,
  onSubmit,
  handleSubmit,
  errors,
  setValue,
  onClose,
}) => {
  
  return (
    <Box>
      <TitleWithCloseButton title="Добавить задачу" onClose={onClose} />
      <TaskForm
        data={data}
        objects={objects}
        register={register}
        onSubmit={onSubmit}
        handleSubmit={handleSubmit}
        errors={errors}
        setValue={setValue}
        onClose={onClose}
        // isValid={isFullValid}
      />
    </Box>
  );
};

export default CreateTask;
