// libraries
import { useTheme } from "@emotion/react";
import { tokens } from "@theme/theme";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import React, { FC, useEffect, useState } from "react";
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
import { getObjectById } from "@store/object/objects.store";
import { createTask } from "@store/task/tasks.store";
// initial-states
import { taskManagerCreateInitialState } from "@initial-states/pages/task-manager-create.initial-state";
// interfaces
import { IDialogPagesState } from "@interfaces/state/dialog-pages-state.interface";

interface CreateManagerTaskProps {
  state: IDialogPagesState;
  onClose: () => void;
}

const CreateManagerTask: FC<CreateManagerTaskProps> = React.memo(
  ({ state, onClose }): JSX.Element => {
    const dispatch = useDispatch();
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const objectId = state?.objectId;
    const dateCreate = state?.dateCreate;

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
      resolver: yupResolver<any>(taskManagerSchema)
    });
    const data = watch();
    const currentObject = useSelector(getObjectById(objectId));
    const managerId = currentObject?.userId;

    const onSubmit = () => {
      setIsLoading(true);

      dispatch<any>(createTask(data))
        .then(() => {
          setIsLoading(false);
          onClose();
          toast.success("Задача менеджеру успешно создана!");
        })
        .catch((error: string) => {
          setIsLoading(false);
          toast.error(error);
        });
    };

    useEffect(() => {
      if (objectId) {
        setValue("objectId", objectId);
      }
      if (managerId) {
        setValue("managerId", managerId);
      }
    }, [objectId, managerId]);

    useEffect(() => {
      if (typeof dateCreate === "string") {
        setValue("date", new Date(dateCreate));
      } else {
        setValue("date", dateCreate);
      }
    }, [dateCreate]);

    return (
      <>
        <HeaderWithCloseButtonForPage
          title="Поставить менеджеру задачу"
          background={colors.task["managerTask"]}
          onClose={onClose}
          margin="0 0 20px 0"
        />
        <ManagerTaskForm
          data={data}
          register={register}
          setValue={setValue}
          watch={watch}
          errors={errors}
          isObjectPage={!!objectId}
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
