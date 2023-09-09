import * as yup from "yup";

export const lastContactSchema = yup.object().shape({
  result: yup.string().required("Заполните комментарий"),
});
