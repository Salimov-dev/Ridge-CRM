import { useState } from "react";
import { InputAdornment, IconButton, Box, Typography } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { FieldsContainer, Form } from "../components/common/forms/styled";
import TextFieldStyled from "../components/common/inputs/text-field-styled";
import SelectFieldStyled from "@components/common/inputs/select-field-styled";
import { CirclePicker } from "react-color";
import styled from "@emotion/styled";

const ColorPicker = styled(Box)`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 5px 0 25px 0;
  gap: 14px;
`;

const AuthForm = ({
  data,
  register,
  errors,
  color,
  onColorChange,
  isRegister = false
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <Form noValidate>
      <FieldsContainer sx={{ flexDirection: "column" }}>
        <TextFieldStyled
          register={register}
          label="Почта"
          type="text"
          name="email"
          errors={errors?.email}
          value={data?.email}
        />

        <TextFieldStyled
          register={register}
          label="Пароль"
          type={showPassword ? "text" : "password"}
          name="password"
          value={data?.password}
          errors={errors?.password}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            )
          }}
        />
        {isRegister && (
          <SelectFieldStyled
            label="Выберите город"
            register={register}
            name="objectTypes"
            labelId="objectTypes"
            required={true}
            // itemsList={sortedObjectTypes}
            // value={watchObjectTypes ?? ""}
            errors={errors?.objectTypes}
          />
        )}
      </FieldsContainer>

      {isRegister && (
        <ColorPicker>
          <Typography variant="h5" sx={{ color: "yellow" }}>
            Выберите свой цвет в Грядке:
          </Typography>
          <CirclePicker color={color} onChangeComplete={onColorChange} />
        </ColorPicker>
      )}
    </Form>
  );
};

export default AuthForm;
