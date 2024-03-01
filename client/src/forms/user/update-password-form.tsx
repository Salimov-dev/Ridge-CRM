import { FieldsContainer, Form } from "../../components/common/forms/styled";
import TextFieldStyled from "../../components/common/inputs/text-field-styled";

const UpdatePasswordForm = ({ data, register, errors }) => {
  return (
    <Form noValidate>
      <FieldsContainer sx={{ flexDirection: "column" }}>
        <TextFieldStyled
          register={register}
          label="Старый пароль"
          type="text"
          name="currentPassword"
          errors={errors?.currentPassword}
          value={data?.currentPassword}
          onInputQuantities={125}
        />
        <TextFieldStyled
          register={register}
          label="Новый пароль"
          type="text"
          name="newPassword"
          errors={errors?.newPassword}
          value={data?.newPassword}
          onInputQuantities={125}
        />
      </FieldsContainer>
    </Form>
  );
};

export default UpdatePasswordForm;
