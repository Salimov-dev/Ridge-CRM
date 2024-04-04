import { FieldsContainer, Form } from "@components/common/forms/styled";
import TextFieldStyled from "@components/common/inputs/text-field-styled";

const ForgotPasswordForm = ({ data, register, errors }) => {
  return (
    <Form noValidate sx={{ marginBottom: "0px" }}>
      <FieldsContainer sx={{ flexDirection: "column" }}>
        <TextFieldStyled
          register={register}
          label="Почта при регистрации"
          type="text"
          name="email"
          errors={errors?.email}
          value={data?.email}
          inputProps={{ maxLength: 150 }}
        />
      </FieldsContainer>
    </Form>
  );
};

export default ForgotPasswordForm;
