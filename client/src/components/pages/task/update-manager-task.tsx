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
import LoaderFullWindow from "@components/common/loader/loader-full-window";
import SuccessCancelFormButtons from "@components/common/buttons/success-cancel-form-buttons";
import MyTaskForm from "@forms/my-task.form";
import DialogConfirm from "@components/common/dialog/dialog-confirm";
import HeaderWithCloseButton from "@components/common/page-headers/header-with-close-button";
// schema
import { taskSchema } from "@schemas/task.shema";
// store
import { getObjectsList } from "@store/object/objects.store";
import { getTaskById, removeTask, updateTask } from "@store/task/tasks.store";

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
    time: task?.time ? dayjs(task?.time) : null
  };

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm({
    defaultValues: formatedTask,
    mode: "onChange",
    resolver: yupResolver(taskSchema)
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
        onClose();
        toast.success("Задача менеджеру успешно изменена!");
      })
      .catch((error) => {
        toast.error(error);
      })
      .finally(() => {
        setIsLoading(false);
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
      <HeaderWithCloseButton
        title={title}
        background={colors.task["managerTask"]}
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
      <DialogConfirm
        question="Вы уверены, что хотите удалить задачу менеджеру?"
        open={open}
        onSuccessClick={() => handleRemoveTask(watchManagerId)}
        onClose={handleClose}
      />
      <LoaderFullWindow isLoading={isLoading} />
    </>
  );
});

export default UpdateManagerTask;
