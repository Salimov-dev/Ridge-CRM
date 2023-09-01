import dayjs from "dayjs";

const getEndWeekDate = () => {
  const today = dayjs();
  const startDate = today.endOf("week").add(1, 'day');
  return startDate;
};

export default getEndWeekDate;
