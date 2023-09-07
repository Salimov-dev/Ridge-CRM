import * as yup from "yup";

export const ridgeObjectSchema = yup.object().shape({
  status: yup.string().required("Статус обязателен для заполнения"),
  location: yup.object().shape({
    district: yup.string().required("Район обязателен для заполнения"),
  }),
});
