// libraries
import { useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
// components
import HeaderForLayout from "@components/common/headers/header-for-layout";
import { ContainerStyled } from "@components/common/container/container-styled";
import CalendarLayoutHeader from "@layouts/calendar/components/header/calendar-layout-header";
import CalendarLayoutBody from "@layouts/calendar/components/body/calendar-body";
import DialogPages from "@dialogs/dialog-pages";
// utils
import getMonth from "@utils/calendar/get-month";
// store
import { getMonthIndexState } from "@store/month-index/month-index.store";
// interfaces
import { IDialogPagesState } from "@interfaces/state/dialog-pages-state.interface";
// initial-states
import { dialogePagesState } from "@initial-states/dialog-pages-state/dialog-pages.state";

const CalendarLayout = React.memo(() => {
  const [currentMonth, setCurrentMonth] = useState(getMonth());
  const [stateDialogPages, setStateDialogPages] =
    useState<IDialogPagesState>(dialogePagesState);

  const monthIndex = useSelector(getMonthIndexState());

  useEffect(() => {
    setCurrentMonth(getMonth(monthIndex));
  }, [monthIndex]);

  return (
    <ContainerStyled>
      <HeaderForLayout title="Календарь" />
      <CalendarLayoutHeader setState={setStateDialogPages} />
      <CalendarLayoutBody
        currentMonth={currentMonth}
        setState={setStateDialogPages}
      />
      <DialogPages
        state={stateDialogPages}
        setState={setStateDialogPages}
        videoTitle="Как пользоваться страницей с Календарем"
        videoSrc="https://www.youtube.com/embed/8DoIs0htfsU"
      />
    </ContainerStyled>
  );
});

export default CalendarLayout;
