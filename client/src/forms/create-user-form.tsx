import { FieldsContainer, Form } from "../components/common/forms/styled";
import TextFieldStyled from "../components/common/inputs/text-field-styled";
import SelectFieldStyled from "../components/common/inputs/select-field-styled";
import { userRolesArray } from "@data/users/user-roles";

const CreateUserForm = ({ data, register, errors }) => {
  const roleManager = "69gfoep3944jgjdso345002";
  const roleObserver = "69dgp34954igfj345043001";

  const transformedRoles = userRolesArray.filter((role) => {
    return role._id === roleManager || role._id === roleObserver;
  });

  return (
    <Form noValidate>
      <FieldsContainer sx={{ flexDirection: "column" }}>
        <TextFieldStyled
          register={register}
          label="Почта"
          type="text"
          name="email"
          required={true}
          errors={errors?.email}
          value={data?.email}
          onInputQuantities={125}
        />
        <SelectFieldStyled
          label="Роль"
          register={register}
          name="role"
          labelId="role"
          required={true}
          itemsList={transformedRoles}
          value={data.role ?? ""}
          errors={errors?.role}
        />
      </FieldsContainer>
    </Form>
  );
};

export default CreateUserForm;
