// libraries
import dayjs from "dayjs";
import { toast } from "react-toastify";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
// components
import MyTaskForm from "../../common/forms/my-task-form/my-task-form";
import TitleWithCloseButton from "../../common/page-titles/title-with-close-button";
import FooterButtons from "../../common/forms/footer-buttons/footer-buttons";
import IsLoadingDialog from "../../common/dialog/is-loading-dialog";
// store
import { createTask } from "../../../store/task/tasks.store";
// schema
import { taskSchema } from "../../../schemas/task-shema";
// utils
import { capitalizeFirstLetter } from "../../../utils/data/capitalize-first-letter";

const initialState = {
  date: null,
  time: null,
  objectId: "",
  managerId: "",
  comment: "",
  result: "",
  isDone: false,
  isCallTask: true,
};

const CreateMyTask = React.memo(({
  title,
  dateCreate,
  onClose,
  objects,
  objectPageId = "",
  isObjectPage = false,
}) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    watch,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: initialState,
    mode: "onBlur",
    resolver: yupResolver(taskSchema),
  });
  const data = watch();

  const watchDate = watch<any>("date", null);
  const watchTime = watch<any>("time", null);
  const isFullValid = isValid && watchDate && watchTime;

  const onSubmit = () => {
    setIsLoading(true);

    const newData = {
      ...data,
      comment: capitalizeFirstLetter(data.comment),
      result: capitalizeFirstLetter(data.result),
      managerId: null,
    };
    dispatch<any>(createTask(newData))
      .then(() => {
        setIsLoading(false);
        onClose();
        toast.success("Задача себе успешно создана!");
      })
      .catch((error) => {
        setIsLoading(false);
        toast.error(error);
      });
  };

  useEffect(() => {
    if (isObjectPage) {
      setValue<any>("objectId", objectPageId);
    }
  }, [objectPageId]);

  useEffect(() => {
    if (dateCreate !== null) {
      setValue<any>("date", dateCreate);
    } else {
      setValue<any>("date", dayjs());
    }
  }, [dateCreate]);

  return isLoading ? (
    <IsLoadingDialog
      text="Немного подождите, создаем `Новую задачу себе`"
      isLoading={isLoading}
    />
  ) : (
    <>
      <TitleWithCloseButton
        title={title}
        background="orange"
        color="white"
        onClose={onClose}
      />
      <MyTaskForm
        data={data}
        objects={objects}
        register={register}
        watch={watch}
        errors={errors}
        setValue={setValue}
        isObjectPage={isObjectPage}
      />
      <FooterButtons
        onCreate={handleSubmit(onSubmit)}
        onClose={onClose}
        isValid={isFullValid}
      />
    </>
  );
});

export default CreateMyTask;
