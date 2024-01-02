// liraries
import dayjs from "dayjs";
import { toast } from "react-toastify";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTheme } from "@emotion/react";
import { tokens } from "@theme/theme";
import { useDispatch, useSelector } from "react-redux";
// components
import MyTaskForm from "@common/forms/my-task-form/my-task-form";
import ConfirmRemoveDialog from "@common/dialog/confirm-remove-dialog";
import TitleWithCloseButton from "@common/page-titles/header-with-close-button";
import SuccessCancelFormButtons from "@components/common/forms/footer-buttons/success-cancel-form-buttons";
import LoaderFullWindow from "@components/common/loader/loader-full-window";
// schema
import { taskSchema } from "@schemas/task-shema";
//utils
import { capitalizeFirstLetter } from "@utils/data/capitalize-first-letter";
import { getObjectsList } from "@store/object/objects.store";
import { getCurrentUserId } from "@store/user/users.store";
import { createLastContact } from "@store/last-contact/last-contact.store";
// store
import {
  getTaskById,
  getTaskLoadingStatus,
  removeTask,
  updateTask,
} from "@store/task/tasks.store";

const UpdateMyTask = React.memo(({ title, taskId, objectId, onClose }) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: formatedTask,
    mode: "onChange",
    resolver: yupResolver(taskSchema),
  });

  const data = watch();
  const isEditMode = taskId ? true : false;
  const objects = useSelector(getObjectsList());

  const currentUserId = useSelector(getCurrentUserId());
  const currentUserObjects = objects?.filter(
    (obj) => obj?.userId === currentUserId
  );

  const onSubmit = (data) => {
    setIsLoading(true);

    const transformedDate = dayjs(data.date).format("YYYY-MM-DDTHH:mm:ss.SSSZ");
    const transformedTime = dayjs(data.time).format("YYYY-MM-DDTHH:mm:ss.SSSZ");
    const newData = {
      ...data,
      date: transformedDate,
      time: transformedTime,
    };
    console.log("newData", newData);

    const lastContactData = {
      date: data.date,
      objectId: data.objectId,
      result: capitalizeFirstLetter(data.result).trim(),
    };

    dispatch<any>(updateTask(newData))
      .then(() => {
        setIsLoading(false);
        onClose();
        toast.success("Задача себе успешно изменена!");
      })
      .then(() => {
        const result = data?.result;
        const isCallTask = data?.isCallTask;
        if (isCallTask && result) {
          dispatch<any>(createLastContact(lastContactData))
            .then(() => {
              onClose();
              toast.success("Последний контакт успешно создан!");
            })
            .catch((error) => {
              toast.error(error);
            });
        }
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
        objects={currentUserObjects}
        register={register}
        watch={watch}
        errors={errors}
        setValue={setValue}
        isEditMode={isEditMode}
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

export default UpdateMyTask;
