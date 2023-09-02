// liraries
import dayjs from "dayjs";
import { useEffect } from "react";
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
import { getTaskById, updateMyTask } from "../../../store/task/tasks.store";
// schema
import { taskSchema } from "../../../schemas/schemas";

const UpdateManagerTask = ({ title, onClose, objects, users }) => {
  const dispatch = useDispatch();

  const taskId = useSelector(getUpdateManagerTaskId());
  const task = useSelector(getTaskById(taskId));
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

  const isFullValid = data.date !== null && data.time !== null && isValid;
  const isEditMode = taskId ? true : false;

  const onSubmit = (data) => {
    const transformedDate = dayjs(data.date).format("YYYY-MM-DDTHH:mm:ss.SSSZ");
    const transformedTime = dayjs(data.time).format("YYYY-MM-DDTHH:mm:ss.SSSZ");
    const newData = { ...data, date: transformedDate, time: transformedTime };

    dispatch(updateMyTask(newData, taskId))
      .then(onClose())
      .then(toast.success("Задача менеджеру успешно изменена!"));
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
        background="red"
        color="white"
        onClose={onClose}
      />
      <ManagerTaskForm
        register={register}
        data={data}
        users={users}
        objects={objects}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        onClose={onClose}
        errors={errors}
        setValue={setValue}
        isValid={!isFullValid}
        isEditMode={isEditMode}
        watch={watch}
      />
    </>
  );
};

export default UpdateManagerTask;
