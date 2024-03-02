import * as yup from "yup";

export const objectPageStatusSchema = yup.object().shape({
  status: yup.string().nullable().required("Выберите статус")
});
