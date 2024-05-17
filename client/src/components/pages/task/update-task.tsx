// liraries
import dayjs from "dayjs";
import { toast } from "react-toastify";
import React, { FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTheme } from "@emotion/react";
import { tokens } from "@theme/theme";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
// components
import TaskForm from "@forms/tasks/task.form";
import TitleWithCloseButton from "@components/common/headers/header-with-close-button.page";
import SuccessCancelFormButtons from "@components/common/buttons/success-cancel-form-buttons";
import LoaderFullWindow from "@components/common/loader/loader-full-window";
import DialogConfirm from "@components/common/dialog/dialog-confirm";
// schema
import { taskSchema } from "@schemas/task/task.shema";
// interfaces
import { IDialogPagesState } from "@interfaces/state/dialog-pages-state.interface";
// hooks
import useRemoveItem from "@hooks/item/use-remove-item";
// store
import { getTaskById, removeTask, updateTask } from "@store/task/tasks.store";

interface UpdateTaskProps {
  state: IDialogPagesState;
  onClose: () => void;
}

const UpdateTask: FC<UpdateTaskProps> = React.memo(
  ({ state, onClose }): JSX.Element => {
    const dispatch = useDispatch();
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const [isLoading, setIsLoading] = useState(false);

    const title = "Изменить свою задачу";
    const taskId = state.taskId;
    const objectId = state.objectId;
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
    const watchIsCallTask = watch("isCallTask");

    const onSubmit = () => {
      setIsLoading(true);

      const transformedDate = dayjs(data.date).format(
        "YYYY-MM-DDTHH:mm:ss.SSSZ"
      );
      const transformedTime = dayjs(data.time).format(
        "YYYY-MM-DDTHH:mm:ss.SSSZ"
      );
      const newData = {
        ...data,
        date: transformedDate,
        time: transformedTime
      };

      dispatch<any>(updateTask(newData))
        .then(() => {
          setIsLoading(false);
          onClose();
          toast.success("Задача себе успешно изменена!");
        })
        .catch((error: string) => {
          setIsLoading(false);
          toast.error(error);
        });
    };

    const {
      openConfirm,
      handleOpenConfirm,
      handleCloseConfirm,
      handleRemoveItem
    } = useRemoveItem({
      onRemove: removeTask(taskId),
      onClose,
      setIsLoading
    });

    useEffect(() => {
      if (objectId) {
        setValue("objectId", objectId);
      }
    }, [objectId]);

    return (
      <>
        <TitleWithCloseButton
          title={watchIsCallTask ? "Нужно совершить звонок" : title}
          background={watchIsCallTask ? "ForestGreen" : colors.task["myTask"]}
          color="white"
          onClose={onClose}
        />
        <TaskForm
          data={data}
          register={register}
          setValue={setValue}
          watch={watch}
          errors={errors}
          isUpdatePage={!!taskId}
          isObjectPage={!!objectId}
        />
        <SuccessCancelFormButtons
          onSuccess={handleSubmit(onSubmit)}
          onCancel={onClose}
          onRemove={handleOpenConfirm}
        />
        <DialogConfirm
          question="Вы уверены, что хотите удалить свою задачу?"
          open={openConfirm}
          onClose={handleCloseConfirm}
          onSuccessClick={() => handleRemoveItem()}
        />
        <LoaderFullWindow isLoading={isLoading} />
      </>
    );
  }
);

export default UpdateTask;
