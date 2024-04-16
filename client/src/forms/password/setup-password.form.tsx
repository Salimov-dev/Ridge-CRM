import { useState } from "react";
import { InputAdornment, IconButton, Box } from "@mui/material";
// icons
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
// styled
import { FieldsContainer, Form } from "@styled/styled-form";
// components
import TextFieldStyled from "@components/common/inputs/text-field-styled";

const SetupPasswordForm = ({ data, register, errors }) => {
  const [showSetupPassword, setShowSetupPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleClickShowSetupPassword = () =>
    setShowSetupPassword((show) => !show);
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
            label="Новый пароль"
            type={showSetupPassword ? "text" : "password"}
            name="setupPassword"
            value={data?.setupPassword}
            errors={errors?.setupPassword}
            inputProps={{ maxLength: 20 }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowSetupPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showSetupPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
          <TextFieldStyled
            register={register}
            label="Подтвердите пароль"
            type={showConfirmPassword ? "text" : "password"}
            name="confirmSetupPassword"
            value={data?.confirmSetupPassword}
            errors={errors?.confirmSetupPassword}
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

export default SetupPasswordForm;
