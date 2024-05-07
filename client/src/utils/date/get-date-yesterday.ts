import dayjs from "dayjs";

const getDateYesterday = () => {
  const today = dayjs();
  return today.subtract(1, "day");
};

export default getDateYesterday;
