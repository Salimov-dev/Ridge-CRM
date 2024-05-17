import * as yup from "yup";

export const taskSchema = yup.object().shape({
  date: yup.date().required("Выберите дату"),
  time: yup.date().required("Выберите время"),
  comment: yup.string().required("Заполните комментарий").nullable(),
  objectId: yup.string().nullable(),
  managerId: yup.string().nullable(),
  result: yup.string().nullable(),
  isDone: yup.boolean(),
  isCallTask: yup.boolean()
});
