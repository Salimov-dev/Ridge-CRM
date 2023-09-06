import dayjs from "dayjs";

export const FormatDate = (date) => {
  return dayjs(new Date(date)).format("DD.MM.YY");
};
