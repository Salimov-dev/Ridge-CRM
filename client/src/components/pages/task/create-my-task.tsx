// libraries
import { toast } from "react-toastify";
import React, { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTheme } from "@emotion/react";
import { useForm } from "react-hook-form";
import { tokens } from "@theme/theme";
import { yupResolver } from "@hookform/resolvers/yup";
// components
import TaskForm from "@forms/tasks/task.form";
import SuccessCancelFormButtons from "@components/common/buttons/success-cancel-form-buttons";
import HeaderWithCloseButtonForPage from "@components/common/headers/header-with-close-button.page";
import LoaderFullWindow from "@components/common/loader/loader-full-window";
// initial-states
import { taskCreateInitialState } from "@initial-states/pages/task-create.initial-state";
// schema
import { taskSchema } from "@schemas/task/task.shema";
// store
import { getCurrentUserId } from "@store/user/users.store";
import { getObjectsList } from "@store/object/objects.store";
import { createTask } from "@store/task/tasks.store";
import { IDialogPagesState } from "@interfaces/state/dialog-pages-state.interface";

interface CreateMyTaskProps {
  state: IDialogPagesState;
  onClose: () => void;
}

const CreateMyTask: FC<CreateMyTaskProps> = React.memo(
  ({ onClose, state }): JSX.Element => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const dispatch: any = useDispatch();

    const [isLoading, setIsLoading] = useState(false);

    const {
      register,
      watch,
      handleSubmit,
      setValue,
      formState: { errors }
    } = useForm({
      defaultValues: taskCreateInitialState,
      mode: "onChange",
      resolver: yupResolver<any>(taskSchema)
    });
    const data = watch();

    const watchIsCallTask = watch("isCallTask");
    const objectId = state.objectId;
    const dateCreate = state.dateCreate;
    const currentUserId = useSelector(getCurrentUserId());
    const objectsList = useSelector(getObjectsList());
    const currentUserObjects = objectsList?.filter(
      (obj) => obj?.userId === currentUserId
    );

    const onSubmit = () => {
      setIsLoading(true);

      dispatch(createTask(data))
        .then(() => {
          onClose();
          toast.success("Задача себе успешно создана!");
        })
        .catch((error: string) => {
          toast.error(error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    };

    useEffect(() => {
      if (objectId) {
        setValue<any>("objectId", objectId);
      }
    }, [objectId]);

    useEffect(() => {
      if (dateCreate !== null) {
        setValue<any>("date", dateCreate);
      } else {
        setValue<any>("date", null);
      }
    }, []);

    return (
      <>
        <HeaderWithCloseButtonForPage
          title={
            watchIsCallTask ? "Нужно совершить звонок" : "Добавить себе задачу"
          }
          background={watchIsCallTask ? "ForestGreen" : colors.task["myTask"]}
          onClose={onClose}
        />
        <TaskForm
          data={data}
          objects={currentUserObjects}
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

export default CreateMyTask;
