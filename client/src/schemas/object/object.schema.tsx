import { removeSpacesAndConvertToNumber } from "@utils/data/remove-spaces-and-convert-to-number";
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
  // Объект
  status: yup.string().required("Статус обязателен для заполнения"),
  currentRenters: yup.string().required("Выберите арендатора"),
  objectTypes: yup.string().required("Выберите тип"),
  estateTypes: yup.string().required("Выберите тип"),
  objectProperties: yup.string().required("Выберите расположение объекта"),
  tradeArea: yup.string().required("Выберите тип"),
  district: yup.string().required("Район обязателен для заполнения"),
  // Коммерческие условия
  rentSquare: yup
    .mixed()
    .test("is-valid-number", "Площадь должна быть числом", function (value) {
      if (value === null) {
        return true; // Пропускаем проверку, если значение равно null
      }
      return !isNaN(removeSpacesAndConvertToNumber(value));
    })
    .nullable(),
  rentPrice: yup
    .mixed()
    .test("is-valid-number", "Стоимость должна быть числом", function (value) {
      if (value === null) {
        return true; // Пропускаем проверку, если значение равно null
      }
      return !isNaN(removeSpacesAndConvertToNumber(value));
    })
    .nullable(),
  agentComission: yup
    .mixed()
    .test(
      "is-valid-number",
      "Комиссия должна быть числом и не превышать 100%",
      function (value) {
        if (value === null) {
          return true; // Пропускаем проверку, если значение равно null
        }
        const regex = /^[0-9.]+$/; // Регулярное выражение, разрешающее только цифры и точку
        return regex.test(value); // Возвращаем true, если значение соответствует регулярному выражению
      }
    )
    .test(
      "is-valid-percent",
      "Комиссия не может превышать 100%",
      function (value) {
        if (value === null) {
          return true; // Пропускаем проверку, если значение равно null
        }
        return parseFloat(value) <= 100; // Возвращаем true, если значение не превышает 100
      }
    )
    .nullable(),
  indexingAnnual: yup
    .mixed()
    .test(
      "is-valid-number",
      "Индексация должна быть числом и не превышать 100%",
      function (value) {
        if (value === null) {
          return true; // Пропускаем проверку, если значение равно null
        }
        const regex = /^[0-9.]+$/; // Регулярное выражение, разрешающее только цифры и точку
        return regex.test(value); // Возвращаем true, если значение соответствует регулярному выражению
      }
    )
    .test(
      "is-valid-percent",
      "Индексация не может превышать 100%",
      function (value) {
        if (value === null) {
          return true; // Пропускаем проверку, если значение равно null
        }
        return parseFloat(value) <= 100; // Возвращаем true, если значение не превышает 100
      }
    )
    .nullable(),
  cadastralNumber: yup
    .mixed()
    .test(
      "is-valid-number",
      "Номер должен содержать только цифры, точку и двоеточие",
      function (value) {
        if (value === null || value === "") {
          return true; // Пропускаем проверку, если значение равно null или пустой строке
        }
        const regex = /^[0-9:.]+$/; // Регулярное выражение, разрешающее только цифры, точку и двоеточие
        return regex.test(value); // Возвращаем true, если значение соответствует регулярному выражению
      }
    )
    .nullable(),
  securityDeposit: yup
    .mixed()
    .test("is-valid-number", "Депозит должнен быть числом", function (value) {
      if (value === null) {
        return true; // Пропускаем проверку, если значение равно null
      }
      return !isNaN(removeSpacesAndConvertToNumber(value));
    })
    .nullable(),
  advanseDeposit: yup
    .mixed()
    .test("is-valid-number", "Депозит должнен быть числом", function (value) {
      if (value === null) {
        return true; // Пропускаем проверку, если значение равно null
      }
      return !isNaN(removeSpacesAndConvertToNumber(value));
    })
    .nullable(),
  // Параметры помещения
  electricityKw: yup
    .mixed()
    .test(
      "is-valid-number",
      "Электричество должно быть числом",
      function (value) {
        if (value === null) {
          return true; // Пропускаем проверку, если значение равно null
        }
        const regex = /^[0-9.]+$/; // Регулярное выражение, разрешающее только цифры и точку
        return regex.test(value); // Возвращаем true, если значение соответствует регулярному выражению
      }
    )
    .nullable(),
  premisesHeight: yup
    .mixed()
    .test(
      "is-valid-number",
      "Высота потолков должна быть числом",
      function (value) {
        if (value === null) {
          return true; // Пропускаем проверку, если значение равно null
        }
        const regex = /^[0-9.]+$/; // Регулярное выражение, разрешающее только цифры и точку
        return regex.test(value); // Возвращаем true, если значение соответствует регулярному выражению
      }
    )
    .nullable(),
  parkingQuantity: yup
    .mixed()
    .test("is-valid-number", "Количество должно быть числом", function (value) {
      if (value === null) {
        return true; // Пропускаем проверку, если значение равно null
      }
      return !isNaN(removeSpacesAndConvertToNumber(value));
    })
    .nullable(),
  // Облако
  cloudLink: yup.string().url("Введите корректный URL адрес").nullable()
});
