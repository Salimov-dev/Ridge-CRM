import * as yup from "yup";

export const taskManagerSchema = yup.object().shape({
  comment: yup.string().required("Заполните комментарий"),
});
