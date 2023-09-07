import getDateToday from "./get-date-today";

export const chechIsFutureDay = (day) => {
  const currentDay = getDateToday();

  return day.isAfter(currentDay, "day");
};
