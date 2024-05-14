import * as yup from "yup";

export const meetingSchema = yup.object().shape({
  address: yup.string(),
  city: yup.string(),
  comment: yup.string().required("Заполните комментарий"),
  objectId: yup.string().required("Укажите объект встречи"),
  date: yup.date().required("Выберите дату"),
  latitude: yup.number(),
  longitude: yup.number(),
  result: yup.string(),
  status: yup.string().required("Статус обязателен для заполнения"),
  time: yup.date().required("Выберите время"),
  type: yup.string().required("Тип обязателен для заполнения")
});
