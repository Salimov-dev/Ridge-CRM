import { useState } from "react";
import { InputAdornment, IconButton } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { FieldsContainer, Form } from "./styled/styled";
import TextFieldStyled from "../inputs/text-field-styled";

const AuthForm = ({ data, startPage = "", register, errors }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordRepeat, setShowPasswordRepeat] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleClickShowPasswordRepeat = () =>
    setShowPasswordRepeat((show) => !show);
  const handleMouseDownPasswordRepeat = (
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
          onInputQuantities={125}
        />
        <TextFieldStyled
          register={register}
          label="Пароль"
          type={showPassword ? "text" : "password"}
          name="password"
          value={data?.password}
          onInputQuantities={8}
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
            ),
          }}
        />
        {startPage === "register" && (
          <TextFieldStyled
            register={register}
            label="Повторите пароль"
            type={showPasswordRepeat ? "text" : "password"}
            name="passwordRepeat"
            onInputQuantities={8}
            value={data?.passwordRepeat}
            errors={errors?.passwordRepeat}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPasswordRepeat}
                    onMouseDown={handleMouseDownPasswordRepeat}
                    edge="end"
                  >
                    {showPasswordRepeat ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        )}
      </FieldsContainer>
    </Form>
  );
};

export default AuthForm;