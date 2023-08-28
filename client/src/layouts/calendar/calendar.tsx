import { Box } from "@mui/material";
import LayoutTitle from "../../components/common/page-titles/layout-title";
import getMonth from "../../utils/calendar/get-month";
import Header from "./components/header";
import Month from "./components/month";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getMonthIndexState } from "../../store/month-index.store";

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(getMonth());
  const monthIndex = useSelector(getMonthIndexState());

  useEffect(() => {
    setCurrentMonth(getMonth(monthIndex));
  }, [monthIndex]);

  return (
    <>
      <LayoutTitle title="Календарь" />
      <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
        <Header />
        <Box sx={{ display: "flex", flex: 1 }}>
          <Month month={currentMonth} />
        </Box>
      </Box>
    </>
  );
};

export default Calendar;
