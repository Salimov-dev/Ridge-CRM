import * as yup from "yup";

export const presentationSchema = yup.object().shape({
  objectId: yup.string().required("Выберите объект"),
  cloudLink: yup
    .string()
    .url("Введите корректный URL адрес")
    .required("Укажите ссылку на облако")
    .nullable(),
});
