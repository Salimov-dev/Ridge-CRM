import { useState } from "react";
import { InputAdornment, IconButton } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { FieldsContainer, Form } from "./styled/styled";
import TextFieldStyled from "../inputs/text-field-styled";

const UpdatePasswordForm = ({ data, register, errors }) => {
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
          label="Старый пароль"
          type="text"
          name="prevPassword"
          errors={errors?.prevPassword}
          value={data?.prevPassword}
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
