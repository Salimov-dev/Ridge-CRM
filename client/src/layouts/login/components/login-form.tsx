import { useState } from "react";
import { InputAdornment, IconButton } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {
  FieldsContainer,
  Form,
} from "../../../components/common/forms/styled/styled";
import TextFieldStyled from "../../../components/common/inputs/text-field-styled";

const LoginForm = ({ data, register, errors }) => {
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
          label="Логин"
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
      </FieldsContainer>
    </Form>
  );
};

export default LoginForm;
