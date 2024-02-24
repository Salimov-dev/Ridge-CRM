import * as yup from "yup";

export const companySchema = yup.object().shape({
  name: yup.string().required("Заполните название"),
  profile: yup.string().required("Выберите профиль"),
  contacts: yup
    .array()
    .of(
      yup.object().shape({
        contact: yup.string().required("Контакт обязателен для заполнения")
      })
    )
    .required("Необходимо указать хотя бы один контакт"),
  objects: yup
    .array()
    .of(
      yup.object().shape({
        object: yup.string().required("Не может быть пустым")
      })
    )
    .required("Необходимо указать хотя бы один объект")
});
