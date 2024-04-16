import * as yup from "yup";

export const taskSchema = yup.object().shape({
  date: yup.date().required("Выберите дату"),
  time: yup.date().required("Выберите время"),
  comment: yup.string().required("Заполните комментарий"),
  objectId: yup.string(),
  result: yup.string().nullable(),
  isDone: yup.boolean(),
  isCallTask: yup.boolean()
});
