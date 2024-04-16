import styled from "@emotion/styled";
import { Box, Typography } from "@mui/material";
import { FieldsContainer, Form } from "@styled/styled-form";
// components
import TextFieldStyled from "@components/common/inputs/text-field-styled";
import ColorPicker from "@components/common/color-picker/color-picker";
import SimpleSwitch from "@components/common/inputs/simple-switch";
import SimpleSelectField from "@components/common/inputs/simple-select-field";
// data
import {
  roleManagerId,
  roleObserverId,
  userRolesArray
} from "@data/users/user-roles";
import { citiesArray } from "@data/object/cities";

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
  onColorChange,
  isUpdatePage = false
}) => {
  const transformedRoles = userRolesArray.filter((role) => {
    return role._id === roleManagerId || role._id === roleObserverId;
  });

  return (
    <Form noValidate>
      <FieldsContainer sx={{ flexDirection: "column" }}>
        {isUpdatePage ? (
          <Container>
            <String>
              <Typography variant="h5">Электр.почта: </Typography>
              <Typography variant="h5" sx={{ color: "Yellow" }}>
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
            inputProps={{ maxLength: 100 }}
          />
        )}
        <SimpleSelectField
          label="Роль"
          register={register}
          name="role"
          labelId="role"
          required={true}
          itemsList={transformedRoles}
          value={data.role ?? ""}
          errors={errors?.role}
        />
        <SimpleSelectField
          register={register}
          itemsList={citiesArray}
          name="city"
          labelId="city"
          required={true}
          label="Город"
          value={data?.city}
          errors={errors?.city}
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
