import { Box, Typography } from "@mui/material";
import TaskForm from "../../../../components/common/forms/task-form/task-form";
import TitleWithCloseButton from "../../../../components/common/page-titles/title-with-close-button";

const CreateTask = ({
  data,
  register,
  onSubmit,
  handleSubmit,
  watch,
  errors,
  setValue,
  onClose,
}) => {
  return (
    <Box>
      <TitleWithCloseButton title="Добавить задачу" onClose={onClose} />
      <TaskForm
        data={data}
        register={register}
        onSubmit={onSubmit}
        handleSubmit={handleSubmit}
        watch={watch}
        errors={errors}
        setValue={setValue}
        onClose={onClose}
        // isValid={isFullValid}
      />
    </Box>
  );
};

export default CreateTask;
