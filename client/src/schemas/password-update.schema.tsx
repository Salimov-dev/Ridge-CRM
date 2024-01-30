import * as yup from "yup";

export const passwordUpdateSchema = yup.object().shape({
  currentPassword: yup
    .string()
    .min(8, "Слишком короткий пароль - введите не менее 8 символов")
    .required("Предыдущий пароль обязателен для заполнения"),
  newPassword: yup
    .string()
    .min(8, "Слишком короткий пароль - введите не менее 8 символов")
    .required("Новый пароль обязателен для заполнения"),
});
