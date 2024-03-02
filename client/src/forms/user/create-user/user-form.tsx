import { FieldsContainer, Form } from "@components/common/forms/styled";
import TextFieldStyled from "@components/common/inputs/text-field-styled";
import SelectFieldStyled from "@components/common/inputs/select-field-styled";
import ColorPicker from "@components/common/color-picker/color-picker";
import { userRolesArray } from "@data/users/user-roles";
import { Box, Typography } from "@mui/material";
import styled from "@emotion/styled";
import SimpleSwitch from "@components/common/inputs/simple-switch";

const String = styled(Box)`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const Container = styled(Box)`
  height: 40px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const UserForm = ({
  data,
  register,
  errors,
  color,
  setValue,
  watch,
  onColorChange,
  isUpdatePage = false
}) => {
  const roleManager = "69gfoep3944jgjdso345002";
  const roleObserver = "69dgp34954igfj345043001";

  const transformedRoles = userRolesArray.filter((role) => {
    return role._id === roleManager || role._id === roleObserver;
  });

  return (
    <Form noValidate>
      <FieldsContainer sx={{ flexDirection: "column" }}>
        {isUpdatePage ? (
          <Container>
            <String>
              <Typography variant="h5">Электр.почта: </Typography>
              <Typography variant="h4" sx={{ color: "Yellow" }}>
                {data?.email}
              </Typography>
            </String>
            <SimpleSwitch
              title="Активирован"
              value={data.isActive}
              padding="0"
              onChange={(e) => {
                setValue("isActive", e.target.checked);
              }}
            />
          </Container>
        ) : (
          <TextFieldStyled
            register={register}
            label="Почта"
            type="text"
            name="email"
            required={true}
            errors={errors?.email}
            value={data?.email}
          />
        )}
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
        <ColorPicker
          title="Выберите цвет нового пользователя в Грядке"
          color={color}
          onColorChange={onColorChange}
          errors={errors}
        />
      </FieldsContainer>
    </Form>
  );
};

export default UserForm;
