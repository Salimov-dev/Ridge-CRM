import * as yup from "yup";

export const taskSchema = yup.object().shape({
  comment: yup.string().required("Заполните комментарий"),
  date: yup.date().required("Выберите дату"),
  time: yup.date().required("Выберите время"),
});
