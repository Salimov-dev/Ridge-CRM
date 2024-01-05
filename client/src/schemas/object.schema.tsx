import * as yup from "yup";

const isValidPhone = (phone) => {
  if (phone === "" || phone === null) {
    return true;
  }

  const formattedPhone = String(phone).replace(/\D/g, "");
  const validFormats = [/^7\d{10}$/, /^7\d{6}$/, /^\d{7}$/];

  return validFormats.some((format) => format.test(formattedPhone));
};

export const objectSchema = yup.object().shape({
  status: yup.string().required("Статус обязателен для заполнения"),
  contact: yup.object().shape({
    name: yup.string().matches(/^([^0-9]*$)/, "Имя не должно содержать цифры"),
    email: yup.string().email("Некорректный адрес электронной почты"),
    phone: yup
      .string()
      .test("is-valid-phone", "Некорректный номер телефона", isValidPhone)
      .nullable(),
  }),
  location: yup.object().shape({
    district: yup.string().required("Район обязателен для заполнения"),
  }),
  cloudLink: yup.string().url("Введите корректный URL адрес").nullable(),
  estateOptions: yup.object().shape({
    currentRenters: yup.string().required("Выберите арендатора"),
    estateTypes: yup.string().required("Выберите тип"),
    objectTypes: yup.string().required("Выберите тип"),
    tradeArea: yup.string().required("Выберите тип"),
    objectProperties: yup.string().required("Выберите расположение объекта"),

    // TODO сделать проверку на значение не более 100
    // commercialTerms: yup.object().shape({
    //   agentComission: yup
    //     .string()
    //     .min(0, "Не меньше 0%")
    //     .max(100, "Не больше 100%"),
    // }),
  }),
});
