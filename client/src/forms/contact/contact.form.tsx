// styled
import { FieldsContainer, Form } from "@components/common/forms/styled";
// components
import FieldsPhone from "./components/fields-phone";
import FieldsEmail from "./components/fields-email";
import FieldsCompany from "./components/field-company";
import FieldsObject from "./components/field-object";
import MainFields from "./components/main-fields";

const ContactForm = ({
  data,
  setState,
  watch,
  control,
  register,
  errors,
  setValue
}) => {
  return (
    <>
      <Form noValidate>
        <FieldsContainer sx={{ flexDirection: "column" }}>
          <MainFields
            register={register}
            data={data}
            errors={errors}
            watch={watch}
          />

          <FieldsCompany
            data={data}
            register={register}
            errors={errors}
            setValue={setValue}
            control={control}
            watch={watch}
            setState={setState}
          />
          <FieldsPhone
            data={data}
            register={register}
            errors={errors}
            setValue={setValue}
            control={control}
          />
          <FieldsEmail
            data={data}
            register={register}
            errors={errors}
            setValue={setValue}
            control={control}
          />
          <FieldsObject
            data={data}
            register={register}
            errors={errors}
            setValue={setValue}
            control={control}
            watch={watch}
            setState={setState}
          />
        </FieldsContainer>
      </Form>
    </>
  );
};

export default ContactForm;
