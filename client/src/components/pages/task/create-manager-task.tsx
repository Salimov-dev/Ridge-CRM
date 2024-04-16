// libraries
import { useTheme } from "@emotion/react";
import { tokens } from "@theme/theme";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import React, { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
// components
import HeaderWithCloseButtonForPage from "@components/common/headers/header-with-close-button.page";
import SuccessCancelFormButtons from "@components/common/buttons/success-cancel-form-buttons";
import LoaderFullWindow from "@components/common/loader/loader-full-window";
// schema
import { taskManagerSchema } from "@schemas/task/task-manager.shema";
// forms
import ManagerTaskForm from "@forms/tasks/manager-task.form";
// store
import { createTask } from "@store/task/tasks.store";
// initial-states
import { taskManagerCreateInitialState } from "@initial-states/pages/task-manager-create.initial-state";
// hooks
import useTaskManagerCreateHook from "@hooks/task/use-task-manager-create";

const CreateManagerTask = React.memo(
  ({ title, dateCreate, onClose, objectId, isObjectPage }) => {
    const dispatch = useDispatch();
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const [isLoading, setIsLoading] = useState(false);

    const {
      register,
      watch,
      handleSubmit,
      setValue,
      formState: { errors }
    } = useForm({
      defaultValues: taskManagerCreateInitialState,
      mode: "onChange",
      resolver: yupResolver(taskManagerSchema)
    });
    const data = watch();
    const watchManagerId = watch("managerId");

    const { actualUsersArray, managerObjects, managerId } =
      useTaskManagerCreateHook(objectId, watch);

    const onSubmit = () => {
      setIsLoading(true);

      dispatch<any>(createTask(data))
        .then(() => {
          setIsLoading(false);
          onClose();
          toast.success("Задача менеджеру успешно создана!");
        })
        .catch((error) => {
          setIsLoading(false);
          toast.error(error);
        });
    };

    useEffect(() => {
      setValue<any>("objectId", objectId);
      setValue<any>("managerId", managerId);

      if (dateCreate !== null) {
        setValue<any>("date", dateCreate);
      } else {
        setValue<any>("date", null);
      }
    }, []);

    useEffect(() => {
      setValue("objectId", null);
    }, [watchManagerId]);

    return (
      <>
        <HeaderWithCloseButtonForPage
          title={title}
          background={colors.task["managerTask"]}
          onClose={onClose}
          margin="0 0 20px 0"
        />
        <ManagerTaskForm
          data={data}
          objects={managerObjects}
          register={register}
          setValue={setValue}
          watch={watch}
          errors={errors}
          users={actualUsersArray}
          isObjectPage={isObjectPage}
        />
        <SuccessCancelFormButtons
          onSuccess={handleSubmit(onSubmit)}
          onCancel={onClose}
          disabledRemoveButton={true}
        />
        <LoaderFullWindow isLoading={isLoading} />
      </>
    );
  }
);

export default CreateManagerTask;
