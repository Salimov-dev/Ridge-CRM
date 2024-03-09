import * as yup from "yup";

export const createUserSchema = yup.object().shape({
  email: yup
    .string()
    .email("Введите email корректно")
    .required("Почта обязательна для заполнения"),
  role: yup.string().required("Выберите роль"),
  color: yup.string().required("ОБЯЗАТЕЛЬНО ВЫБЕРИТЕ ЦВЕТ")
});
