import * as yup from "yup";

export const lastContactSchema = yup.object().shape({
  date: yup.date().required("Выберите дату"),
  result: yup.string().required("Заполните результат"),
});
