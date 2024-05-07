import dayjs from "dayjs";

export const chechIsCurrentDay = (day) => {
  const currentDay = dayjs().format("DD-MM-YY");
  const calendarDay = day?.format("DD-MM-YY");
  const isCurrentDay = currentDay === calendarDay;

  return isCurrentDay;
};
