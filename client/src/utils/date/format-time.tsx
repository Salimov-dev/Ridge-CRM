import dayjs from "dayjs";

export const FormatTime = (date) => {
  return dayjs(date).format("HH:mm");
};
