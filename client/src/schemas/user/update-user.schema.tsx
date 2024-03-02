import * as yup from "yup";

export const updateUserSchema = yup.object().shape({
  email: yup
    .string()
    .email("Введите email корректно")
    .required("Логин обязателен для заполнения"),
  city: yup.string().required("Выберите город"),
  color: yup.string().required("ОБЯЗАТЕЛЬНО ВЫБЕРИТЕ ЦВЕТ")
});
