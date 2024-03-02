import * as yup from "yup";

const isValidPhone = (phone) => {
  if (phone === "" || phone === null) {
    return true;
  }

  const formattedPhone = String(phone).replace(/\D/g, "");
  const validFormats = [/^7\d{10}$/, /^7\d{6}$/, /^\d{7}$/];

  return validFormats.some((format) => format.test(formattedPhone));
};

export const userProfileSchema = yup.object().shape({
  firstName: yup
    .string()
    .matches(/^([^0-9]*$)/, "Имя не должно содержать цифры")
    .required("Имя обязательно для заполнения"),
  lastName: yup
    .string()
    .matches(/^([^0-9]*$)/, "Фамилия не должна содержать цифры")
    .required("Фамилия обязательна для заполнения"),
  surName: yup
    .string()
    .matches(/^([^0-9]*$)/, "Отчество не должно содержать цифры")
    .required("Отчество обязательно для заполнения"),
  phone: yup
    .string()
    .test("is-valid-phone", "Некорректный номер телефона", isValidPhone)
    .nullable()
    .required("Телефон обязателен для заполнения"),
  birthday: yup.date().required("Выберите дату"),
  gender: yup.string().required("Выберите пол"),
});
