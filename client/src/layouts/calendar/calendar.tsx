// libraries
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, Dialog, DialogTitle, Typography } from "@mui/material";
import LayoutTitle from "../../components/common/page-titles/layout-title";
import getMonth from "../../utils/calendar/get-month";
import Header from "./components/header";
import Month from "./components/month";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getMonthIndexState } from "../../store/month-index.store";
import DaysOfWeek from "./components/days-of-week/days-of-week";
import { taskSchema } from "../../schemas/schemas";
import { capitalizeFirstLetter } from "../../utils/data/capitalize-first-letter";
import TaskForm from "../../components/common/forms/task-form/task-form";
import DialogStyled from "../../components/common/dialog/dialog-styled";
import CreateTask from "./components/create-task/create-task";

const initialState = {
  comment: "",
  date: null,
  time: null,
  objectId: "",
};

const Calendar = () => {
  const [openCreate, setOpenCreate] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(getMonth());
  const monthIndex = useSelector(getMonthIndexState());

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

  const onSubmit = (data) => {
    const newData = {
      ...data,
      comment: capitalizeFirstLetter(data.comment),
    };
    console.log("newData", newData);

    // dispatch(createMeeting(newData))
    // .then(navigate("/meetings"))
    // .then(toast.success("Встреча успешно создана!"));
  };

  const handleOpenCreate = () => {
    setOpenCreate(true);
  };

  const handleCloseCreate = () => {
    setOpenCreate(false);
  };

  useEffect(() => {
    setCurrentMonth(getMonth(monthIndex));
  }, [monthIndex]);

  return (
    <>
      <LayoutTitle title="Календарь" />

      <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
        <Header />

        <Button variant="outlined" color="success" onClick={handleOpenCreate}>
          Создать событие
        </Button>

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
            register={register}
            onSubmit={onSubmit}
            handleSubmit={handleSubmit}
            watch={watch}
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
