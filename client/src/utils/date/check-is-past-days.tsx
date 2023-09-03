import dayjs from "dayjs";

export const chechIsPastDaysFromToday = (day) => {
  const currentDay = dayjs();
  return day.isBefore(currentDay, "day").add(1, "day");
};
