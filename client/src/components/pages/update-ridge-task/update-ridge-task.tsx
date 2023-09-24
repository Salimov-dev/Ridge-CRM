// liraries
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
// components
import MyTaskForm from "../../common/forms/my-task-form/my-task-form";
import TitleWithCloseButton from "../../common/page-titles/title-with-close-button";
import FooterButtons from "../../common/forms/footer-buttons/footer-buttons";
import ConfirmRemoveDialog from "../../common/dialog/confirm-remove-dialog";
// store
import { getCurrentUserId } from "../../../store/user/users.store";
import { getRidgeObjectsList } from "../../../store/ridge-object/ridge-objects.store";
import { getUpdateRidgeTaskId } from "../../../store/ridge-task/update-ridge-task.store";
import {
  getRidgeTaskById,
  getRidgeTaskLoadingStatus,
  removeRidgeTask,
  updateRidgeTask,
} from "../../../store/ridge-task/ridge-tasks.store";
// schema
import { taskSchema } from "../../../schemas/task-shema";
// utils
import { capitalizeFirstLetter } from "../../../utils/data/capitalize-first-letter";

const UpdateRidgeTask = ({ title, onClose }) => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const taskId = useSelector(getUpdateRidgeTaskId());
  const task = useSelector(getRidgeTaskById(taskId));
  const isTasksLoading = useSelector(getRidgeTaskLoadingStatus());

  const objects = useSelector(getRidgeObjectsList());
  const objectId = task?.objectId;

  const currentUserId = useSelector(getCurrentUserId());
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
  const isFullValid = isValid && watchDate && watchTime;

  const isEditMode = taskId ? true : false;

  const onSubmit = (data) => {
    const transformedDate = dayjs(data.date).format("YYYY-MM-DDTHH:mm:ss.SSSZ");
    const transformedTime = dayjs(data.time).format("YYYY-MM-DDTHH:mm:ss.SSSZ");
    const newData = {
      ...data,
      date: transformedDate,
      time: transformedTime,
      comment: capitalizeFirstLetter(data.comment),
    };

    dispatch<any>(updateRidgeTask(newData))
      .then(onClose())
      .then(toast.success("Задача себе успешно изменена!"));
  };

  const handleRemoveTask = (taskId) => {
    dispatch<any>(removeRidgeTask(taskId))
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
        background="darkGreen"
        color="white"
        onClose={onClose}
      />
      <MyTaskForm
        data={data}
        objects={transformObjects}
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

export default UpdateRidgeTask;
