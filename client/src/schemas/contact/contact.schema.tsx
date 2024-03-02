import * as yup from "yup";

export const contactSchema = yup.object().shape({
  name: yup.string().required("Заполните имя"),
  position: yup.string().required("Выберите позицию"),
  comment: yup.string(),
  phones: yup.array().of(
    yup.object().shape({
      phone: yup.string().required("Заполните номер телефона"),
      isDefault: yup.boolean()
    })
  ),
  emails: yup
    .array()
    .of(
      yup.object().shape({
        email: yup
          .string()
          .email("Введите корректный email")
          .required("Email обязателен для заполнения"),
        isDefault: yup.boolean()
      })
    )
    .required("Необходимо указать хотя бы один email"),
  companies: yup
    .array()
    .of(
      yup.object().shape({
        company: yup
          .string()
          .required("Название компании обязательно для заполнения")
      })
    )
    .required("Необходимо указать хотя бы одну компанию"),
  objects: yup
    .array()
    .of(
      yup.object().shape({
        object: yup.string().required("Не может быть пустым")
      })
    )
    .required("Необходимо указать хотя бы один объект")
});
