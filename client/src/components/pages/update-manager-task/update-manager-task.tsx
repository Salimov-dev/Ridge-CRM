// liraries
import dayjs from "dayjs";
import { toast } from "react-toastify";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
// components
import TitleWithCloseButton from "../../common/page-titles/header-with-close-button";
import ManagerTaskForm from "../../common/forms/manager-task-form/manager-task-form";
import FooterButtons from "../../common/forms/footer-buttons/success-cancel-form-buttons";
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
import LoaderFullWindow from "@components/common/loader/loader-full-window";
import SuccessCancelFormButtons from "../../common/forms/footer-buttons/success-cancel-form-buttons";
import { useTheme } from "@emotion/react";
import { tokens } from "@theme/theme";
import MyTaskForm from "@components/common/forms/my-task-form/my-task-form";

const UpdateManagerTask = React.memo(({ title, onClose, taskId, users }) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const task = useSelector(getTaskById(taskId));

  const formatedTask = {
    ...task,
    date: task?.date ? dayjs(task?.date) : null,
    time: task?.time ? dayjs(task?.time) : null,
  };

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: formatedTask,
    mode: "onBlur",
    resolver: yupResolver(taskSchema),
  });

  const data = watch();
  const watchManagerId = watch("managerId", null);
  const objectId = task?.objectId;
  const objects = useSelector(getObjectsList());
  const selectedManagerObjects = objects?.filter(
    (obj) => obj?.userId === watchManagerId
  );

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

  return (
    <>
      <TitleWithCloseButton
        title={title}
        background="Crimson"
        color="white"
        onClose={onClose}
      />
      <MyTaskForm
        data={data}
        objects={selectedManagerObjects}
        register={register}
        setValue={setValue}
        watch={watch}
        errors={errors}
        isCurator={true}
        users={users}
      />
      <SuccessCancelFormButtons
        onSuccess={handleSubmit(onSubmit)}
        onCancel={onClose}
        onRemove={handleClickOpen}
        isUpdate={true}
      />
      <ConfirmRemoveDialog
        removeId={taskId}
        open={open}
        onClose={handleClose}
        onRemove={handleRemoveTask}
      />
      <LoaderFullWindow
        color={colors.grey[600]}
        size={75}
        isLoading={isLoading}
      />
    </>
  );
});

export default UpdateManagerTask;
