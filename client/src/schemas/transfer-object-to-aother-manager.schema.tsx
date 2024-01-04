import * as yup from "yup";

export const transferObjectToAnotherManagerSchema = yup.object().shape({
  managerId: yup.string().required("Выберите менеджера"),
});
