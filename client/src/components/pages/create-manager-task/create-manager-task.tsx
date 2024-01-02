// libraries
import { useTheme } from "@emotion/react";
import { tokens } from "@theme/theme";
import dayjs from "dayjs";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import React, { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
// components
import TitleWithCloseButton from "@common/page-titles/header-with-close-button";
import SuccessCancelFormButtons from "@common/forms/footer-buttons/success-cancel-form-buttons";
import LoaderFullWindow from "@components/common/loader/loader-full-window";
import MyTaskForm from "@components/common/forms/my-task-form/my-task-form";
// schema
import { taskSchema } from "@schemas/task-shema";
// utils
import { capitalizeFirstLetter } from "@utils/data/capitalize-first-letter";
// store
import { createTask } from "@store/task/tasks.store";
import { getObjectById, getObjectsList } from "@store/object/objects.store";

const initialState = {
  comment: "",
  date: null,
  time: null,
  objectId: "",
  managerId: "",
  result: "",
  isDone: false,
  isCallTask: true,
};

const CreateManagerTask = React.memo(
  ({ users, title, dateCreate, onClose, objectPageId }) => {
    const dispatch = useDispatch();
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const [isLoading, setIsLoading] = useState(false);

    const {
      register,
      watch,
      handleSubmit,
      setValue,
      formState: { errors },
    } = useForm({
      defaultValues: initialState,
      mode: "onChange",
      resolver: yupResolver(taskSchema),
    });
    const data = watch();

    const objects = useSelector(getObjectsList());
    const currentObject = useSelector(getObjectById(objectPageId));
    const managerId = currentObject?.userId;

    const onSubmit = () => {
      setIsLoading(true);

      const newData = {
        ...data,
        comment: capitalizeFirstLetter(data.comment),
      };
      dispatch<any>(createTask(newData))
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
      setValue<any>("objectId", objectPageId);
      setValue<any>("managerId", managerId);
    }, []);

    useEffect(() => {
      if (dateCreate !== null) {
        setValue<any>("date", dateCreate);
      } else {
        setValue<any>("date", dayjs());
      }
    }, [dateCreate]);

    return (
      <>
        <TitleWithCloseButton
          title={title}
          background={colors.task["managerTask"]}
          onClose={onClose}
          margin="0 0 20px 0"
        />
        <MyTaskForm
          data={data}
          objects={objects}
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
        />
        <LoaderFullWindow
          color={colors.grey[600]}
          size={75}
          isLoading={isLoading}
        />
      </>
    );
  }
);

export default CreateManagerTask;
