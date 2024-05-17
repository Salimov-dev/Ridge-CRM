// liraries
import dayjs from "dayjs";
import { toast } from "react-toastify";
import React, { FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTheme } from "@emotion/react";
import { tokens } from "@theme/theme";
import { useDispatch, useSelector } from "react-redux";
// components
import LoaderFullWindow from "@components/common/loader/loader-full-window";
import SuccessCancelFormButtons from "@components/common/buttons/success-cancel-form-buttons";
import DialogConfirm from "@components/common/dialog/dialog-confirm";
import HeaderWithCloseButtonForPage from "@components/common/headers/header-with-close-button.page";
// schema
import { taskSchema } from "@schemas/task/task.shema";
// forms
import ManagerTaskForm from "@forms/tasks/manager-task.form";
// interfaces
import { IDialogPagesState } from "@interfaces/state/dialog-pages-state.interface";
// store
import { getObjectsList } from "@store/object/objects.store";
import { getTaskById, removeTask, updateTask } from "@store/task/tasks.store";
import {
  getIsCurrentUserRoleManager,
  getUsersList
} from "@store/user/users.store";

interface UpdateManagerTaskProps {
  state: IDialogPagesState;
  onClose: () => void;
}

const UpdateManagerTask: FC<UpdateManagerTaskProps> = React.memo(
  ({ state, onClose }): JSX.Element => {
    const dispatch = useDispatch();
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const [openConfirm, setOpenConfirm] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const taskId = state.taskId;
    const task = useSelector(getTaskById(taskId));
    const managerId = task?.managerId;
    const objectId = task?.objectId;

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

    const isCurrentUserRoleManager = useSelector(getIsCurrentUserRoleManager());

    const onSubmit = () => {
      setIsLoading(true);

      const transformedDate = dayjs(data.date).format(
        "YYYY-MM-DDTHH:mm:ss.SSSZ"
      );
      const transformedTime = dayjs(data.time).format(
        "YYYY-MM-DDTHH:mm:ss.SSSZ"
      );
      const newData = { ...data, date: transformedDate, time: transformedTime };

      dispatch<any>(updateTask(newData))
        .then(() => {
          onClose();
          toast.success("Задача менеджеру успешно изменена!");
        })
        .catch((error: string) => {
          toast.error(error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    };

    const handleOpenConfirm = () => {
      setOpenConfirm(true);
    };

    const handleCloseConfirm = () => {
      setOpenConfirm(false);
    };

    const handleRemoveTask = () => {
      setIsLoading(true);
      dispatch<any>(removeTask(taskId))
        .then(onClose(), handleCloseConfirm())
        .catch((error: string) => {
          toast.error(error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    };

    useEffect(() => {
      if (objectId) {
        setValue("objectId", objectId);
      }
    }, [objectId]);

    useEffect(() => {
      setValue<any>("objectId", objectId);
      setValue<any>("managerId", managerId);
    }, []);

    return (
      <>
        <HeaderWithCloseButtonForPage
          title={
            !isCurrentUserRoleManager
              ? "Изменить задачу менеджеру"
              : "Изменить задачу от Куратора"
          }
          background={colors.task["managerTask"]}
          color="white"
          onClose={onClose}
        />
        <ManagerTaskForm
          data={data}
          register={register}
          setValue={setValue}
          watch={watch}
          errors={errors}
          isUpdatePage={true}
          isObjectPage={!!objectId}
        />
        <SuccessCancelFormButtons
          onSuccess={handleSubmit(onSubmit)}
          onCancel={onClose}
          disabledRemoveButton={isCurrentUserRoleManager}
          onRemove={handleOpenConfirm}
        />
        <DialogConfirm
          question="Вы уверены, что хотите удалить задачу менеджеру?"
          open={openConfirm}
          onSuccessClick={() => handleRemoveTask()}
          onClose={handleCloseConfirm}
        />
        <LoaderFullWindow isLoading={isLoading} />
      </>
    );
  }
);

export default UpdateManagerTask;
