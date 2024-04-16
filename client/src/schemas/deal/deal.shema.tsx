import * as yup from "yup";

export const dealSchema = yup.object().shape({
  stageId: yup.string().required("Выберите этап сделки"),
  objectId: yup.string().required("Выберите объект"),
});
