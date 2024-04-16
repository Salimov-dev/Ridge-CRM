// styled
import { FieldsContainer, Form } from "@styled/styled-form";
// components
import FieldsPhone from "@components/common/forms/dynamic-fields/fields-phone";
import FieldsEmail from "@components/common/forms/dynamic-fields/fields-email";
import FieldsCompany from "@components/common/forms/dynamic-fields/fields-company";
import FieldsObject from "@components/common/forms/dynamic-fields/fields-object";
import MainFieldsContactForm from "./components/main-fields.contact-form";

const ContactForm = ({
  data,
  setState = () => {},
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
          <MainFieldsContactForm
            register={register}
            data={data}
            errors={errors}
            watch={watch}
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
          <FieldsCompany
            data={data}
            register={register}
            errors={errors}
            setValue={setValue}
            control={control}
            watch={watch}
            setState={setState}
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
