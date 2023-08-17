import { Button, TextField,  InputAdornment, IconButton  } from "@mui/material";
import styled from "@emotion/styled";
import { useState } from "react";
import HasAccount from "./account-info";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const Enter = styled(Button)`
  margin-top: 20px;
`;

const SignUpForm = ({
  data,
  onSubmit,
  onChange,
  errors,
  register,
  isFormValid,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
  return (
    <form
      onSubmit={onSubmit}
      style={{
        display: "flex",
        padding: "20px",
        gap: "10px",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <TextField
        {...register("name")}
        label="Имя"
        id="name"
        name="name"
        value={data.name}
        onChange={onChange}
        error={!!errors?.name}
        helperText={errors?.name?.message}
      />
      <TextField
        {...register("email")}
        label="E-mail"
        id="email"
        name="email"
        value={data.email}
        onChange={onChange}
        error={!!errors?.email}
        helperText={errors?.email?.message}
      />
      <TextField
        {...register("password")}
        label="Пароль"
        id="password"
        name="password"
        type={showPassword ? "text" : "password"}
        value={data.password}
        onChange={onChange}
        error={!!errors?.password}
        helperText={errors?.password?.message}
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

      <Enter type="submit" variant="contained" disabled={!isFormValid}>
        Отправить
      </Enter>

      <HasAccount />
    </form>
  );
};

export default SignUpForm;
