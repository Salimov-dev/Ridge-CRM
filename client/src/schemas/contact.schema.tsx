import * as yup from "yup";

export const contactSchema = yup.object().shape({
  name: yup.string().required("Заполните имя"),
  position: yup.string().required("Выберите позицию"),
  comment: yup.string(),
  emails: yup.array().of(
    yup.object().shape({
      email: yup.string().email("Введите корректный email"),
      isDefault: yup.boolean()
    })
  ),
  companies: yup.array().of(
    yup.object().shape({
      company: yup.string()
    })
  ),
  phones: yup.array().of(
    yup.object().shape({
      phone: yup.string().required("Заполните номер телефона"),
      isDefault: yup.boolean()
    })
  ),
  objects: yup.array().of(
    yup.object().shape({
      objectId: yup.string()
    })
  )
});
