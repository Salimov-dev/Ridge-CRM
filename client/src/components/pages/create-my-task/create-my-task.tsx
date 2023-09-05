// libraries
import { useEffect } from "react";
import { Box } from "@mui/material";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
// components
import MyTaskForm from "../../common/forms/my-task-form/my-task-form";
import TitleWithCloseButton from "../../common/page-titles/title-with-close-button";
// store
import { createTask } from "../../../store/task/tasks.store";
// schema
import { taskSchema } from "../../../schemas/schemas";
// utils
import { capitalizeFirstLetter } from "../../../utils/data/capitalize-first-letter";

const initialState = {
  comment: "",
  date: null,
  time: null,
  objectId: "",
  managerId: "",
};

const CreateMyTask = ({ objects, objectPageId, title, onClose, date }) => {
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
  const isFullValid = !watchDate || !watchTime || !isValid;

  const onSubmit = () => {
    const newData = {
      ...data,
      comment: capitalizeFirstLetter(data.comment),
      managerId: null,
    };

    // console.log("newData", newData);
    
    dispatch(createTask(newData))
      .then(() => onClose())
      .then(() => toast.success("Задача успешно создана!"));
  };

  useEffect(() => {
    if (objectPageId) {
      setValue("objectId", objectPageId);
    }
  }, [objectPageId]);

  useEffect(() => {
    if (date) {
      setValue("date", date);
    }
  }, [date]);

  return (
    <Box>
      <TitleWithCloseButton
        title={title}
        background="orange"
        color="white"
        onClose={onClose}
      />
      <MyTaskForm
        register={register}
        data={data}
        objects={objects}
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

export default CreateMyTask;
