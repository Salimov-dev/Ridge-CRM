// libraries
import { useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
// components
import HeaderForLayout from "@components/common/headers/header-for-layout";
import PageDialogs from "@components/common/dialog/page-dialogs";
import { ContainerStyled } from "@components/common/container/container-styled";
import CalendarLayoutHeader from "@layouts/calendar/components/header/calendar-layout-header";
import CalendarLayoutBody from "@layouts/calendar/components/body/calendar-body";
// utils
import getMonth from "@utils/calendar/get-month";
// store
import { getMonthIndexState } from "@store/month-index/month-index.store";
import { getObjectsList } from "@store/object/objects.store";

const CalendarLayout = React.memo(() => {
  const [currentMonth, setCurrentMonth] = useState(getMonth());
  const [state, setState] = useState({
    objectPage: false,
    updatePage: false,
    objectId: null,
    createMyTaskPage: false,
    updateMyTaskPage: false,
    createManagerTaskPage: false,
    updateManagerTaskPage: false,
    createLastContactPage: false,
    updateLastContactPage: false,
    createMeetingPage: false,
    updateMeetingPage: false,
    taskId: "",
    lastContactId: "",
    meetingId: "",
    dateCreate: null,
    videoPlayerPage: false
  });

  const monthIndex = useSelector(getMonthIndexState());
  const objects = useSelector(getObjectsList());

  useEffect(() => {
    setCurrentMonth(getMonth(monthIndex));
  }, [monthIndex]);

  return (
    <ContainerStyled>
      <HeaderForLayout title="Календарь" />
      <CalendarLayoutHeader setState={setState} />
      <CalendarLayoutBody currentMonth={currentMonth} setState={setState} />
      <PageDialogs
        state={state}
        setState={setState}
        objects={objects}
        videoTitle="Как пользоваться страницей с Календарем"
        videoSrc="https://www.youtube.com/embed/8DoIs0htfsU"
      />
    </ContainerStyled>
  );
});

export default CalendarLayout;
