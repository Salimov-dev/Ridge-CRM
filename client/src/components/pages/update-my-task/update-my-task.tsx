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
import { getupdateMyTaskId } from "../../../store/task/update-my-task.store";
import { getTaskById, updateMyTask } from "../../../store/task/tasks.store";
import { getObjectsList } from "../../../store/object/objects.store";
import { getCurrentUserId } from "../../../store/user/users.store";
// schema
import { taskSchema } from "../../../schemas/schemas";

const UpdateMyTask = ({ title, onClose }) => {
  const dispatch = useDispatch();
  const taskId = useSelector(getupdateMyTaskId());
  const task = useSelector(getTaskById(taskId));
  const objects = useSelector(getObjectsList());
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
  const isFullValid = data.date !== null && data.time !== null && isValid;
  const isEditMode = taskId ? true : false;

  const onSubmit = (data) => {
    const transformedDate = dayjs(data.date).format("YYYY-MM-DDTHH:mm:ss.SSSZ");
    const transformedTime = dayjs(data.time).format("YYYY-MM-DDTHH:mm:ss.SSSZ");
    const newData = { ...data, date: transformedDate, time: transformedTime };

    dispatch(updateMyTask(newData, taskId))
      .then(onClose())
      .then(toast.success("Задача себе успешно изменена!"));
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
        errors={errors}
        setValue={setValue}
        isValid={!isFullValid}
        isEditMode={isEditMode}
        watch={watch}
      />
    </>
  );
};

export default UpdateMyTask;
