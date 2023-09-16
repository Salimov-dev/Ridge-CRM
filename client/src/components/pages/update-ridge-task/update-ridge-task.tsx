// liraries
import dayjs from "dayjs";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
// components
import MyTaskForm from "../../common/forms/my-task-form/my-task-form";
import TitleWithCloseButton from "../../common/page-titles/title-with-close-button";
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
import { useConfirm } from "material-ui-confirm";
import { capitalizeFirstLetter } from "../../../utils/data/capitalize-first-letter";

const UpdateRidgeTask = ({ title, onClose }) => {
  const dispatch = useDispatch();
  const confirm = useConfirm();
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

    dispatch(updateRidgeTask(newData))
      .then(onClose())
      .then(toast.success("Задача себе успешно изменена!"));
  };

  const handleRemoveTask = (taskId) => {
    confirm({
      title: "Подтвердите удаление встречи",
      description: "Удалить встречу безвозвратно?",
      cancellationButtonProps: { color: "error" },
      confirmationButtonProps: { color: "success" },
      confirmationText: "Подтвердить",
      cancellationText: "Отмена",
    })
      .then(() => {
        dispatch(removeRidgeTask(taskId))
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
        background="darkGreen"
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
        isValid={isFullValid}
        isEditMode={isEditMode}
        isTasksLoading={isTasksLoading}
        watch={watch}
      />
    </>
  );
};

export default UpdateRidgeTask;