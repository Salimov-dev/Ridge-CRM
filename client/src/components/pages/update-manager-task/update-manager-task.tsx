// liraries
import dayjs from "dayjs";
import { toast } from "react-toastify";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
// components
import TitleWithCloseButton from "../../common/page-titles/title-with-close-button";
import ManagerTaskForm from "../../common/forms/manager-task-form/manager-task-form";
import FooterButtons from "../../common/forms/footer-buttons/footer-buttons";
import ConfirmRemoveDialog from "../../common/dialog/confirm-remove-dialog";
import IsLoadingDialog from "../../common/dialog/is-loading-dialog";
// schema
import { taskSchema } from "../../../schemas/task-shema";
// store
import {
  getCurrentUserId,
  getIsUserAuthorThisEntity,
  getIsUserCurator,
} from "../../../store/user/users.store";
import { getUpdateManagerTaskId } from "../../../store/task/update-manager-task.store";
import {
  getTaskById,
  getTaskLoadingStatus,
  removeTask,
  updateTask,
} from "../../../store/task/tasks.store";
import { getObjectsList } from "../../../store/object/objects.store";
import { getOpenObjectPageOpenState } from "../../../store/object/open-object-page.store";
import transformObjectsForSelect from "../../../utils/objects/transform-objects-for-select";

const UpdateManagerTask = React.memo(({ title, onClose, users }) => {
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const taskId = useSelector(getUpdateManagerTaskId());
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
  const watchManagerId = watch("managerId", null);
  const isFullValid = isValid && watchDate && watchTime;
  const isEditMode = taskId ? true : false;

  const objectId = task?.objectId;
  const currentUserId = useSelector(getCurrentUserId());
  const isAuthorEntity = useSelector(
    getIsUserAuthorThisEntity(currentUserId, task)
  );

  const isObjectPage = useSelector(getOpenObjectPageOpenState());
  const isCurator = useSelector(getIsUserCurator(currentUserId));

  const objects = useSelector(getObjectsList());
  const selectedManagerObjects = objects?.filter(
    (obj) => obj?.userId === watchManagerId
  );

  const transformObjects = transformObjectsForSelect(selectedManagerObjects);

  const onSubmit = (data) => {
    setIsLoading(true);

    const transformedDate = dayjs(data.date).format("YYYY-MM-DDTHH:mm:ss.SSSZ");
    const transformedTime = dayjs(data.time).format("YYYY-MM-DDTHH:mm:ss.SSSZ");
    const newData = { ...data, date: transformedDate, time: transformedTime };

    dispatch<any>(updateTask(newData))
      .then(() => {
        setIsLoading(false);
        onClose();
        toast.success("Задача менеджеру успешно изменена!");
      })
      .catch((error) => {
        setIsLoading(false);
        toast.error(error);
      });
  };

  const handleRemoveTask = (taskId) => {
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
      text="Немного подождите, изменяем `Задачу задачу менеджеру`"
      isLoading={isLoading}
    />
  ) : (
    <>
      <TitleWithCloseButton
        title={title}
        background="Crimson"
        color="white"
        onClose={onClose}
      />
      <ManagerTaskForm
        data={data}
        objects={transformObjects}
        users={users}
        register={register}
        watch={watch}
        errors={errors}
        setValue={setValue}
        isCurator={isCurator}
        isAuthorEntity={isAuthorEntity}
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
});

export default UpdateManagerTask;
