// libraries
import dayjs from "dayjs";
import { Box } from "@mui/material";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
// components
import TitleWithCloseButton from "../../common/page-titles/title-with-close-button";
import ManagerTaskForm from "../../common/forms/manager-task-form/manager-task-form";
// store
import { createTask } from "../../../store/task/tasks.store";
// utils
import { capitalizeFirstLetter } from "../../../utils/data/capitalize-first-letter";
// schema
import { taskSchema } from "../../../schemas/schemas";
import ToggleTask from "../../common/tasks/toggler-task";

const initialState = {
  comment: "",
  date: dayjs(),
  time: null,
  objectId: "",
  managerId: "",
  result: "",
};

const CreateManagerTask = ({
  objects,
  users,
  title,
  onClose,
  objectPageId,
  onOpenCreateMyTask,
}) => {
  const dispatch = useDispatch();
  const isObjectPage = Boolean(objectPageId?.length);

  const {
    register,
    watch,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: initialState,
    mode: "onBlur",
    resolver: yupResolver(taskSchema),
  });
  const data = watch();
  const watchDate = watch("date", null);
  const watchTime = watch("time", null);
  const watchManagerId = watch("managerId", null);
  const isFullValid = !watchDate || !watchTime || !watchManagerId || !isValid;

  const onSubmit = () => {
    const newData = {
      ...data,
      comment: capitalizeFirstLetter(data.comment),
    };
    dispatch(createTask(newData))
      .then(() => onClose())
      .then(() => toast.success("Задача успешно создана!"));
  };

  const handleToggleToManagerTask = () => {
    onClose();
    onOpenCreateMyTask();
  };

  useEffect(() => {
    if (objectPageId) {
      setValue("objectId", objectPageId);
    }
  }, [objectPageId]);

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
        register={register}
        data={data}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        onClose={onClose}
        errors={errors}
        setValue={setValue}
        isValid={isFullValid}
        watch={watch}
        isObjectPage={isObjectPage}
      />
      <ToggleTask
        title="Задачу себе"
        backgroundColor="orange"
        color="black"
        onToggle={handleToggleToManagerTask}
      />
    </Box>
  );
};

export default CreateManagerTask;
