import * as yup from "yup";

export const setupPasswordSchema = yup.object().shape({
  setupPassword: yup
    .string()
    .min(8, "Слишком короткий пароль - введите не менее 8 символов")
    .required("Пароль обязателен для заполнения"),
  confirmSetupPassword: yup
    .string()
    .min(8, "Слишком короткий пароль - введите не менее 8 символов")
    .oneOf([yup.ref("setupPassword"), null], "Пароли должны совпадать")
    .required("Пароль обязателен для заполнения")
});
