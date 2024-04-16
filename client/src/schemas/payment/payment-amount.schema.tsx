import * as yup from "yup";

export const paymentAmounySchema = yup.object().shape({
  amount: yup
    .number()
    .required("Введите сумму пополнения")
    .test(
      "is-greater-than-50",
      "Минимальная сумма пополнения 50 рублей",
      (value) => value > 49
    )
});
