// liraries
import dayjs from "dayjs";
import { toast } from "react-toastify";
import React, { useEffect, useState } from "react";
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
//utils
import { capitalizeFirstLetter } from "@utils/data/capitalize-first-letter";
import { getObjectsList } from "@store/object/objects.store";
import { getCurrentUserId } from "@store/user/users.store";
import { createLastContact } from "@store/last-contact/last-contact.store";
// store
import { getTaskById, removeTask, updateTask } from "@store/task/tasks.store";

const UpdateTask = React.memo(
  ({ title, taskId, objectId, onClose, isObjectPage }) => {
    const dispatch = useDispatch();
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const [openConfirm, setOpenConfirm] = useState(false);
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
    const isEditMode = taskId ? true : false;
    const objects = useSelector(getObjectsList());
    const watchIsCallTask = watch("isCallTask");

    const currentUserId = useSelector(getCurrentUserId());
    const currentUserObjects = objects?.filter(
      (obj) => obj?.userId === currentUserId
    );

    const onSubmit = (data) => {
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

      const lastContactData = {
        date: data.date,
        objectId: data.objectId,
        result: capitalizeFirstLetter(data.result)
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

    const handleOpenConfirm = () => {
      setOpenConfirm(true);
    };

    const handleCloseConfirm = () => {
      setOpenConfirm(false);
    };

    const handleRemoveTask = (taskId: number) => {
      setIsLoading(true);
      dispatch<any>(removeTask(taskId))
        .then(onClose(), handleCloseConfirm())
        .catch((error) => {
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
          objects={currentUserObjects}
          register={register}
          setValue={setValue}
          watch={watch}
          errors={errors}
          isEditMode={isEditMode}
          isObjectPage={isObjectPage}
        />
        <SuccessCancelFormButtons
          onSuccess={handleSubmit(onSubmit)}
          onCancel={onClose}
          onRemove={handleOpenConfirm}
        />
        <DialogConfirm
          question="Вы уверены, что хотите удалить свою задачу?"
          open={openConfirm}
          onSuccessClick={() => handleRemoveTask(taskId)}
          onClose={handleCloseConfirm}
        />
        <LoaderFullWindow isLoading={isLoading} />
      </>
    );
  }
);

export default UpdateTask;