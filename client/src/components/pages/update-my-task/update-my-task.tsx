// liraries
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
// components
import MyTaskForm from "../../common/forms/my-task-form/my-task-form";
import FooterButtons from "../../common/forms/footer-buttons/footer-buttons";
import ConfirmRemoveDialog from "../../common/dialog/confirm-remove-dialog";
import TitleWithCloseButton from "../../common/page-titles/title-with-close-button";
// store
import { getUpdateMyTaskId } from "../../../store/task/update-my-task.store";
import {
  getTaskById,
  getTaskLoadingStatus,
  removeTask,
  updateMyTask,
} from "../../../store/task/tasks.store";
import { getObjectsList } from "../../../store/object/objects.store";
import { getCurrentUserId } from "../../../store/user/users.store";
// schema
import { taskSchema } from "../../../schemas/task-shema";
import {
  getOpenObjectPageId,
  loadOpenObjectPageOpenState,
} from "../../../store/object/open-object-page.store";

const UpdateMyTask = ({ title, onClose }) => {
  const [open, setOpen] = useState(false);
  const taskId = useSelector(getUpdateMyTaskId());
  const task = useSelector(getTaskById(taskId));
  const isTasksLoading = useSelector(getTaskLoadingStatus());
  const dispatch = useDispatch();

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
  const objects = useSelector(getObjectsList());
  const objectId = task?.objectId;

  const isObjectPage = useSelector(loadOpenObjectPageOpenState());
  const objectPageId = useSelector(getOpenObjectPageId());
  
  const currentUserId = useSelector(getCurrentUserId());
  const currentUserObjects = objects?.filter(
    (obj) => obj?.userId === currentUserId
  );

  let transformObjects = [];
  currentUserObjects?.forEach((obj) => {
    transformObjects?.push({ _id: obj._id, name: obj.location.address });
  });

  const onSubmit = (data) => {
    const transformedDate = dayjs(data.date).format("YYYY-MM-DDTHH:mm:ss.SSSZ");
    const transformedTime = dayjs(data.time).format("YYYY-MM-DDTHH:mm:ss.SSSZ");
    const newData = {
      ...data,
      date: transformedDate,
      time: transformedTime,
    };

    dispatch<any>(updateMyTask(newData))
      .then(onClose())
      .then(toast.success("Задача себе успешно изменена!"));
  };

  const handleRemoveTask = (taskId: number) => {
    dispatch<any>(removeTask(taskId))
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
        background="orange"
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
        isObjectPage={isObjectPage}
      />
      <FooterButtons
        onUpdate={handleSubmit(onSubmit)}
        onClose={onClose}
        onRemove={handleClickOpen}
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

export default UpdateMyTask;
