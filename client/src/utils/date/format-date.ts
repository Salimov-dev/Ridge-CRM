import dayjs from "dayjs";
import "dayjs/locale/ru";

export const FormatDate = (date) => {
  if (date !== null && date !== undefined) {
    return dayjs(date)?.format("DD.MM.YY");
  } else {
    return "-";
  }
};
