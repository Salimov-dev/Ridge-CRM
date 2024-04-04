import * as yup from "yup";

export const forgotPasswordSchema = yup.object().shape({
  email: yup
    .string()
    .email("Введите email корректно")
    .required("Почта для восстановления обязательна")
});
