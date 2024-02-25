// styled
import { FieldsContainer, Form } from "@components/common/forms/styled";
// components
import FieldsPhone from "@components/common/forms/dynamic-fields/fields-phone";
import FieldsEmail from "@components/common/forms/dynamic-fields/fields-email";
import FieldsCompany from "@components/common/forms/dynamic-fields/fields-company";
import FieldsObject from "@components/common/forms/dynamic-fields/fields-object";
import MainFields from "./components/main-fields";

const ContactForm = ({
  data,
  setState = () => {},
  watch,
  control,
  register,
  errors,
  setValue,
  isHideElement
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
            isHideElement={isHideElement}
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
            isHideElement={isHideElement}
          />
        </FieldsContainer>
      </Form>
    </>
  );
};

export default ContactForm;
