import * as yup from "yup";

export const contactSchema = yup.object().shape({
  name: yup.string().required("Заполните имя"),
  position: yup.string().required("Выберите позицию"),
  comment: yup.array(),
  companies: yup.array(),
  objects: yup.array()
});
