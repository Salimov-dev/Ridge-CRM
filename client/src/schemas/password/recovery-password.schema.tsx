import * as yup from "yup";

export const recoveryPasswordSchema = yup.object().shape({
  email: yup
    .string()
    .email("Введите email корректно")
    .required("Почта для восстановления обязательна"),
  newPassword: yup
    .string()
    .min(8, "Слишком короткий пароль - введите не менее 8 символов")
    .required("Пароль обязателен для заполнения"),
  confirmNewPassword: yup
    .string()
    .min(8, "Слишком короткий пароль - введите не менее 8 символов")
    .oneOf([yup.ref("newPassword"), null], "Пароли должны совпадать")
    .required("Пароль обязателен для заполнения")
});
