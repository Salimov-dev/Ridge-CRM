import dayjs from "dayjs";
import "dayjs/locale/ru";

export const FormatDate = (date) => {
  return dayjs(date).format("DD.MM.YY");
};
