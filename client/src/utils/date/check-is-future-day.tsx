import dayjs from "dayjs";

export const chechIsFutureDay = (day) => {
  const currentDay = dayjs();
  return day.isAfter(currentDay, "day");
};
