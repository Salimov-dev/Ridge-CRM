import { useState } from "react";
import { InputAdornment, IconButton, Box } from "@mui/material";
// icons
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
//styled
import { FieldsContainer, Form } from "@styled/styled-form";
// components
import TextFieldStyled from "@components/common/inputs/text-field-styled";

const RecoveryPasswordForm = ({ data, register, errors }) => {
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleClickShowNewPassword = () => setShowNewPassword((show) => !show);
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <Box>
      <Form noValidate>
        <FieldsContainer sx={{ flexDirection: "column" }}>
          <TextFieldStyled
            register={register}
            label="Почта"
            type="text"
            name="email"
            errors={errors?.email}
            value={data?.email}
            inputProps={{ maxLength: 150 }}
          />

          <TextFieldStyled
            register={register}
            label="Новый пароль"
            type={showNewPassword ? "text" : "password"}
            name="newPassword"
            value={data?.newPassword}
            errors={errors?.newPassword}
            inputProps={{ maxLength: 20 }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowNewPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showNewPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
          <TextFieldStyled
            register={register}
            label="Подтвердите пароль"
            type={showConfirmPassword ? "text" : "password"}
            name="confirmNewPassword"
            value={data?.confirmNewPassword}
            errors={errors?.confirmNewPassword}
            inputProps={{ maxLength: 20 }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowConfirmPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
        </FieldsContainer>
      </Form>
    </Box>
  );
};

export default RecoveryPasswordForm;
