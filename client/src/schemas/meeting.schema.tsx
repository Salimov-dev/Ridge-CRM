import * as yup from "yup";

export const meetingSchema = yup.object().shape({
  status: yup.string().required("Статус обязателен для заполнения"),
  type: yup.string().required("Тип обязателен для заполнения"),
  comment: yup.string().required("Заполните комментарий"),
  date: yup.date().required("Выберите дату"),
  time: yup.date().required("Выберите время")
});
