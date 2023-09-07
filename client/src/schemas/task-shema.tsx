import * as yup from "yup";

export const taskSchema = yup.object().shape({
  comment: yup.string().required("Заполните комментарий"),
});
