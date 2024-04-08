import * as yup from "yup";

export const registerSchema = yup.object().shape({
  email: yup
    .string()
    .email("Введите email корректно")
    .required("Логин обязателен для заполнения"),
  password: yup
    .string()
    .min(8, "Слишком короткий пароль - введите не менее 8 символов")
    .required("Пароль обязателен для заполнения"),
  city: yup.string().required("Выберите город"),
  color: yup.string().required("ОБЯЗАТЕЛЬНО ВЫБЕРИТЕ ЦВЕТ"),
  confirmPassword: yup
    .string()
    .min(8, "Слишком короткий пароль - введите не менее 8 символов")
    .oneOf([yup.ref("password"), null], "Пароли должны совпадать")
    .required("Пароль обязателен для заполнения")
});
