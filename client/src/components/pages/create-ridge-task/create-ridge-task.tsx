// libraries
import dayjs from "dayjs";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
// mui
import { Box } from "@mui/material";
// components
import MyTaskForm from "../../common/forms/my-task-form/my-task-form";
import TitleWithCloseButton from "../../common/page-titles/title-with-close-button";
// store
import { createRidgeTask } from "../../../store/ridge-task/ridge-tasks.store";
import { getCurrentUserId } from "../../../store/user/users.store";
// schema
import { taskSchema } from "../../../schemas/task-shema";
// utils
import { capitalizeFirstLetter } from "../../../utils/data/capitalize-first-letter";

const initialState = {
  date: dayjs(),
  time: null,
  objectId: "",
  managerId: "",
  comment: "",
  result: "",
  isDone: false,
};

const CreateRidgeTask = ({
  objects,
  title,
  dateCreate,
  onClose,
  objectPageId="",
}) => {
  const dispatch = useDispatch();
  const isObjectPage = Boolean(objectPageId?.length);

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
  
  const watchDate = watch("date", null);
  const watchTime = watch("time", null);
  const isFullValid = isValid && watchDate&& watchTime;

  const currentUserId = useSelector(getCurrentUserId());
  const currentUserObjects = objects?.filter(
    (obj) => obj?.userId === currentUserId
  );

  let transformObjects = [];
  currentUserObjects?.forEach((obj) => {
    transformObjects?.push({ _id: obj._id, name: obj.location.address });
  });

  const onSubmit = () => {
    const newData = {
      ...data,
      comment: capitalizeFirstLetter(data.comment),
      result: capitalizeFirstLetter(data.result),
      managerId: null,
    };

    dispatch(createRidgeTask(newData))
      .then(() => onClose())
      .then(() => toast.success("Задача успешно создана!"));
  };

  useEffect(() => {
    if (objectPageId) {
      setValue("objectId", objectPageId);
    }
  }, [objectPageId]);

  useEffect(() => {
    if (dateCreate !== null) {
      setValue("date", dateCreate);
    } else {
      setValue("date", dayjs());
    }
  }, [dateCreate]);

  return (
    <Box>
      <TitleWithCloseButton
        title={title}
        background="darkGreen"
        color="white"
        onClose={onClose}
      />
      <MyTaskForm
        register={register}
        data={data}
        objects={transformObjects}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        onClose={onClose}
        errors={errors}
        setValue={setValue}
        isValid={isFullValid}
        watch={watch}
        isObjectPage={isObjectPage}
      />
    </Box>
  );
};

export default CreateRidgeTask;
