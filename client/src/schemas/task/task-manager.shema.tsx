import * as yup from "yup";

export const taskManagerSchema = yup.object().shape({
  date: yup.date().required("Выберите дату"),
  time: yup.date().required("Выберите время"),
  comment: yup.string().required("Заполните комментарий"),
  managerId: yup.string().required("Выберите менеджера")
});
