// liraries
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
// components
import TitleWithCloseButton from "../../common/page-titles/title-with-close-button";
import ManagerTaskForm from "../../common/forms/manager-task-form/manager-task-form";
// store
import { getCurrentUserId } from "../../../store/user/users.store";
import { getUpdateManagerTaskId } from "../../../store/task/update-manager-task.store";
import {
  getTaskById,
  getTaskLoadingStatus,
  removeTask,
  updateMyTask,
} from "../../../store/task/tasks.store";
// schema
import { taskSchema } from "../../../schemas/task-shema";
import FooterButtons from "../../common/forms/footer-buttons/footer-buttons";
import ConfirmRemoveDialog from "../../common/dialog/confirm-remove-dialog";

const UpdateManagerTask = ({ title, onClose, objects, users }) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const taskId = useSelector(getUpdateManagerTaskId());
  const task = useSelector(getTaskById(taskId));
  const isTasksLoading = useSelector(getTaskLoadingStatus());
  const currentUserId = useSelector(getCurrentUserId());
  const objectId = task?.objectId;
  const currentUserObjects = objects?.filter(
    (obj) => obj?.userId === currentUserId
  );

  let transformObjects = [];
  currentUserObjects?.forEach((obj) => {
    transformObjects?.push({ _id: obj._id, name: obj.location.address });
  });

  const formatedTask = {
    ...task,
    date: task?.date ? dayjs(task?.date) : null,
    time: task?.time ? dayjs(task?.time) : null,
  };

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
  } = useForm({
    defaultValues: formatedTask,
    mode: "onBlur",
    resolver: yupResolver(taskSchema),
  });

  const data = watch();
  const watchDate = watch("date", null);
  const watchTime = watch("time", null);
  const isFullValid = !isValid && watchDate && watchTime;
  const isEditMode = taskId ? true : false;

  const onSubmit = (data) => {
    const transformedDate = dayjs(data.date).format("YYYY-MM-DDTHH:mm:ss.SSSZ");
    const transformedTime = dayjs(data.time).format("YYYY-MM-DDTHH:mm:ss.SSSZ");
    const newData = { ...data, date: transformedDate, time: transformedTime };

    dispatch(updateMyTask(newData, taskId))
      .then(onClose())
      .then(toast.success("Задача менеджеру успешно изменена!"));
  };

  const handleRemoveTask = (taskId) => {
    dispatch(removeTask(taskId))
      .then(onClose())
      .then(toast.success("Задача себе успешно удалена!"));
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (objectId) {
      setValue("objectId", objectId);
    }
  }, [objectId]);

  return (
    <>
      <TitleWithCloseButton
        title={title}
        background="Crimson"
        color="white"
        onClose={onClose}
      />
      <ManagerTaskForm
        data={data}
        objects={objects}
        users={users}
        register={register}
        watch={watch}
        errors={errors}
        setValue={setValue}
        isEditMode={isEditMode}
        isTasksLoading={isTasksLoading}
      />
      <FooterButtons
        onUpdate={handleSubmit(onSubmit)}
        onClose={onClose}
        onRemove={handleClickOpen}
        removeId={taskId}
        isEditMode={isEditMode}
        isValid={isFullValid}
      />
      <ConfirmRemoveDialog
        removeId={taskId}
        open={open}
        onClose={handleClose}
        onRemove={handleRemoveTask}
      />
    </>
  );
};

export default UpdateManagerTask;
