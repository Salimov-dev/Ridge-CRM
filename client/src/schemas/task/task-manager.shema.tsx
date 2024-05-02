import * as yup from "yup";

export const taskManagerSchema = yup.object().shape({
  date: yup.date().required("Выберите дату").nullable(),
  time: yup.date().required("Выберите время").nullable(),
  comment: yup.string().required("Заполните комментарий"),
  managerId: yup.string().required("Выберите менеджера"),
  objectId: yup.string(),
  result: yup.string(),
  isDone: yup.boolean(),
  isCallTask: yup.boolean()
});
