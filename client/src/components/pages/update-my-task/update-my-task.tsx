// liraries
import dayjs from "dayjs";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { useConfirm } from "material-ui-confirm";
// components
import MyTaskForm from "../../common/forms/my-task-form/my-task-form";
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

const UpdateMyTask = ({ title, onClose }) => {
  const confirm = useConfirm();
  const taskId = useSelector(getUpdateMyTaskId());
  const task = useSelector(getTaskById(taskId));
  const isTasksLoading = useSelector(getTaskLoadingStatus());

  const objects = useSelector(getObjectsList());
  const objectId = task?.objectId;
  const dispatch = useDispatch();

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
  const isFullValid = !isValid && watchDate && watchTime;
  const isEditMode = taskId ? true : false;

  const onSubmit = (data) => {
    const transformedDate = dayjs(data.date).format("YYYY-MM-DDTHH:mm:ss.SSSZ");
    const transformedTime = dayjs(data.time).format("YYYY-MM-DDTHH:mm:ss.SSSZ");
    const newData = { ...data, date: transformedDate, time: transformedTime };

    dispatch(updateMyTask(newData, taskId))
      .then(onClose())
      .then(toast.success("Задача себе успешно изменена!"));
  };

  const handleRemoveTask = (taskId) => {
    confirm({
      title: "Подтвердите удаление своей задачи",
      description: "Удалить задачу себе безвозвратно?",
      cancellationButtonProps: { color: "error" },
      confirmationButtonProps: { color: "success" },
    })
      .then(() => {
        dispatch(removeTask(taskId))
          .then(onClose())
          .then(toast.success("Задача себе успешно удалена!"));
      })
      .catch((error) => {
        console.log(error);
      });
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
        register={register}
        data={data}
        objects={transformObjects}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        onClose={onClose}
        onRemoveTask={handleRemoveTask}
        removeId={taskId}
        errors={errors}
        setValue={setValue}
        isValid={!isFullValid}
        isEditMode={isEditMode}
        isTasksLoading={isTasksLoading}
        watch={watch}
      />
    </>
  );
};

export default UpdateMyTask;
