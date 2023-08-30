// libraries
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, Dialog, DialogTitle, Typography } from "@mui/material";
import LayoutTitle from "../../components/common/page-titles/layout-title";
import getMonth from "../../utils/calendar/get-month";
import Header from "./components/header/header";
import Month from "./components/month/month";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getMonthIndexState } from "../../store/month-index.store";
import DaysOfWeek from "./components/days-of-week/days-of-week";
import { taskSchema } from "../../schemas/schemas";
import { capitalizeFirstLetter } from "../../utils/data/capitalize-first-letter";
import TaskForm from "../../components/common/forms/task-form/task-form";
import DialogStyled from "../../components/common/dialog/dialog-styled";
import CreateTask from "./components/create-task/create-task";
import { getObjectsList } from "../../store/object/objects.store";
import { getCurrentUserId } from "../../store/user/users.store";
import dayjs from "dayjs";

const initialState = {
  comment: "",
  date: dayjs(),
  time: null,
  objectId: "",
};

const Calendar = () => {
  const [openCreate, setOpenCreate] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(getMonth());
  const monthIndex = useSelector(getMonthIndexState());

  const objects = useSelector(getObjectsList());
  const currentUserId = useSelector(getCurrentUserId());
  const currentUserObjects = objects?.filter(
    (obj) => obj?.userId === currentUserId
  );

  let transformObjects = [];
  currentUserObjects?.forEach((obj) => {
    transformObjects?.push({ _id: obj._id, name: obj.location.address });
  });

  const {
    register,
    watch,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: initialState,
    mode: "onBlur",
    resolver: yupResolver(taskSchema),
  });

  const data = watch();
  // console.log("data", data);

  const onSubmit = (data) => {
    const newData = {
      ...data,
      comment: capitalizeFirstLetter(data.comment),
    };
    // console.log("newData", newData);

    // dispatch(createMeeting(newData))
    // .then(onClose())
    // .then(toast.success("Встреча успешно создана!"));
  };

  const handleOpenCreate = (day) => {
    const type = typeof day.date;

    setOpenCreate(true);
    if (type === "function") {
      setValue("date", day);
    }
  };

  const handleCloseCreate = () => {
    setOpenCreate(false);
    setValue("date", null);
    reset();
  };

  useEffect(() => {
    setCurrentMonth(getMonth(monthIndex));
  }, [monthIndex]);

  return (
    <>
      <LayoutTitle title="Календарь" />

      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Header onClick={handleOpenCreate} />
        <DaysOfWeek />
        <Box sx={{ display: "flex", flex: 1 }}>
          <Month month={currentMonth} onClick={handleOpenCreate} />
        </Box>
      </Box>

      <DialogStyled
        onClose={handleCloseCreate}
        open={openCreate}
        maxWidth="sm"
        fullWidth={false}
        component={
          <CreateTask
            data={data}
            objects={transformObjects}
            register={register}
            onSubmit={onSubmit}
            handleSubmit={handleSubmit}
            errors={errors}
            setValue={setValue}
            onClose={handleCloseCreate}
          />
        }
      />
    </>
  );
};

export default Calendar;
