import dayjs from "dayjs";

export const FormatDate = (date) => {
  return dayjs(date).format("DD.MM.YY");
};
