import dayjs from "dayjs";

const getMonth = (month = dayjs().month()) => {
  const year = dayjs().year();
  const firstDayOfTheMonth = dayjs(new Date(year, month, 0)).day();
  let currentMonthCount = 0 - firstDayOfTheMonth;

  const daysMatrix = new Array(5).fill([]).map(() => {
    return new Array(7).fill(null).map(() => {
      currentMonthCount++;
      return dayjs(new Date(year, month, currentMonthCount));
    });
  });

  return daysMatrix;
};

export default getMonth;
