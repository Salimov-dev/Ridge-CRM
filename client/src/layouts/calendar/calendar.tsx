// libraries
import dayjs from "dayjs";
import { orderBy } from "lodash";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
// components
import { groupedColumns } from "./table/columns";
import Header from "./components/header/header";
import CreateTask from "./components/create-task/create-task";
import DaysOfWeek from "./components/days-of-week/days-of-week";
import DialogStyled from "../../components/common/dialog/dialog-styled";
import CalendarBody from "./components/calendar-body/calendar-body";
import LayoutTitle from "../../components/common/page-titles/layout-title";
import CurrentWeeklyMeetings from "./components/current-weekly-meetings/current-weekly-meetings";
// utils
import getMonth from "../../utils/calendar/get-month";
import { capitalizeFirstLetter } from "../../utils/data/capitalize-first-letter";
// schema
import { taskSchema } from "../../schemas/schemas";
// store
import { getMonthIndexState } from "../../store/month-index.store";
import { getObjectsList } from "../../store/object/objects.store";
import { getCurrentUserId } from "../../store/user/users.store";
import {
  getMeetingLoadingStatus,
  getMeetingsList,
} from "../../store/meeting/meetings.store";

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
  const columns = groupedColumns;

  const objects = useSelector(getObjectsList());
  const meetings = useSelector(getMeetingsList());
  const isMeetingsLoading = useSelector(getMeetingLoadingStatus());

  const today = dayjs();
  const startOfWeek = today.startOf("week");
  const endOfWeek = today.endOf("week");

  const currentWeeklyMeetings = meetings?.filter((meet) =>
    dayjs(meet.date).isBetween(startOfWeek, endOfWeek, null, "[]")
  );

  const sortedCurrentWeeklyMeetings = orderBy(
    currentWeeklyMeetings,
    ["date"],
    ["asc"]
  );

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
      <Header onClick={handleOpenCreate} />
      <DaysOfWeek />
      <CalendarBody
        currentMonth={currentMonth}
        onOpenCreate={handleOpenCreate}
      />
      <CurrentWeeklyMeetings
        meetings={sortedCurrentWeeklyMeetings}
        columns={columns}
        isLoading={isMeetingsLoading}
      />

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
