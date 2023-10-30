// liraries
import dayjs from "dayjs";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
// components
import MyTaskForm from "../../common/forms/my-task-form/my-task-form";
import FooterButtons from "../../common/forms/footer-buttons/footer-buttons";
import ConfirmRemoveDialog from "../../common/dialog/confirm-remove-dialog";
import TitleWithCloseButton from "../../common/page-titles/title-with-close-button";
import IsLoadingDialog from "../../common/dialog/is-loading-dialog";
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
import { loadOpenObjectPageOpenState } from "../../../store/object/open-object-page.store";
// schema
import { taskSchema } from "../../../schemas/task-shema";

const UpdateMyTask = ({ title, onClose }) => {
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const taskId = useSelector(getUpdateMyTaskId());
  const task = useSelector(getTaskById(taskId));
  const isTasksLoading = useSelector(getTaskLoadingStatus());

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

  const currentUserId = useSelector(getCurrentUserId());
  const currentUserObjects = objects?.filter(
    (obj) => obj?.userId === currentUserId
  );

  let transformObjects = [];
  currentUserObjects?.forEach((obj) => {
    transformObjects?.push({ _id: obj._id, name: obj.location.address });
  });

  const onSubmit = (data) => {
    setIsLoading(true);

    const transformedDate = dayjs(data.date).format("YYYY-MM-DDTHH:mm:ss.SSSZ");
    const transformedTime = dayjs(data.time).format("YYYY-MM-DDTHH:mm:ss.SSSZ");
    const newData = {
      ...data,
      date: transformedDate,
      time: transformedTime,
    };

    dispatch<any>(updateMyTask(newData))
      .then(() => {
        setIsLoading(false);
        onClose();
        toast.success("Задача себе успешно изменена!");
      })
      .catch((error) => {
        setIsLoading(false);
        toast.error(error);
      });
  };

  const handleRemoveTask = (taskId: number) => {
    dispatch<any>(removeTask(taskId)).then(onClose());
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

  return isLoading ? (
    <IsLoadingDialog
      text="Немного подождите, изменяем `Задачу себе`"
      isLoading={isLoading}
    />
  ) : (
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
