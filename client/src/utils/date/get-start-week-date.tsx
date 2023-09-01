import dayjs from "dayjs";

const getStartWeekDate = () => {
  const today = dayjs();
  const startDate = today.startOf("week").add(1, 'day');
  return startDate;
};

export default getStartWeekDate;
