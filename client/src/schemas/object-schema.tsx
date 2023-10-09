import * as yup from "yup";

export const objectSchema = yup.object().shape({
  status: yup.string().required("Статус обязателен для заполнения"),
  contact: yup.object().shape({
    name: yup.string().matches(/^([^0-9]*$)/, "Имя не должно содержать цифры"),
    email: yup.string().email("Некорректный адрес электронной почты"),
  }),
  location: yup.object().shape({
    district: yup.string().required("Район обязателен для заполнения"),
  }),
  estateOptions: yup.object().shape({
    currentRenters: yup.string().required("Выберите арендатора"),
    estateTypes: yup.string().required("Выберите тип"),
    objectTypes: yup.string().required("Выберите тип"),
    objectProperties: yup.string().required("Выберите расположение объекта"),
  }),
});
