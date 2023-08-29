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

const initialState = {
  comment: "",
  date: null,
  time: null,
  objectId: "",
};

const Calendar = () => {
  const [open, setOpen] = useState(false);
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

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    setCurrentMonth(getMonth(monthIndex));
  }, [monthIndex]);

  return (
    <>
      <LayoutTitle title="Календарь" />

      <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
        <Header />

        <Button variant="outlined" color="success" onClick={handleClickOpen}>
          Создать событие
        </Button>

        <DaysOfWeek />
        <Box sx={{ display: "flex", flex: 1 }}>
          <Month month={currentMonth} />
        </Box>
      </Box>

      <Dialog onClose={handleClose} open={open} >
        <Box sx={{ width: '500px', padding: '20px'}}>
        <Typography variant="h3" mb={3}>Добавить задачу в календарь</Typography>
        <TaskForm
          data={data}
          register={register}
          onSubmit={onSubmit}
          handleSubmit={handleSubmit}
          watch={watch}
          errors={errors}
          setValue={setValue}
          onClose={handleClose}
          // isValid={isFullValid}
        />
        </Box>
      
      </Dialog>
    </>
  );
};

export default Calendar;
