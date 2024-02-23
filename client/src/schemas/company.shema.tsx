import * as yup from "yup";

export const companySchema = yup.object().shape({
  name: yup.string().required("Заполните название компании"),
  profile: yup.string().required("Выберите вид деятельности")
});
