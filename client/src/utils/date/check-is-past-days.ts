import getDateToday from "./get-date-today";

export const chechIsPastDaysFromToday = (day) => {
  const currentDay = getDateToday()

  return day.isBefore(currentDay, "day").add(1, "day");
};
