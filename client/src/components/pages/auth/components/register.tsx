// libraries
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useTheme } from "@emotion/react";
import { tokens } from "@theme/theme";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, styled } from "@mui/material";
import { useNavigate } from "react-router-dom";
// components
import ButtonStyled from "@components/common/buttons/button-styled.button";
import LoaderFullWindow from "@components/common/loader/loader-full-window";
import HeaderWithCloseButton from "@components/common/page-headers/header-with-close-button";
import AuthForm from "@forms/user/auth-form";
import PolisiesLinks from "./policies-links";
import PageDialogs from "@components/common/dialog/page-dialogs";
// schema
import { registerSchema } from "@schemas/auth/register.schema";
// store
import { signUp } from "@store/user/users.store";

const Component = styled(Box)`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
`;

const FormContainer = styled(Box)`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: start;
  align-items: center;
  flex-direction: column;
  margin: 0 0 -10px 0;
`;

const initialState = {
  email: "",
  password: "",
  city: null,
  color: null
};

const Register = React.memo(({ page, onClose }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [color, setColor] = useState();
  const [state, setState] = useState({
    loginPage: false,
    agreementPage: false,
    peresonalPolicyPage: false
  });

  const {
    register,
    watch,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm({
    defaultValues: initialState,
    mode: "onSubmit",
    resolver: yupResolver(registerSchema)
  });

  const data = watch();
  const redirectPath = "/users";

  const handleColorChange = (color) => {
    setColor(color);
    setValue("color", color?.hex);
  };

  const onSubmit = () => {
    setIsLoading(true);
    dispatch<any>(signUp(data))
      .then(() => {
        navigate(redirectPath);
        onClose();
      })
      .catch((error) => {
        toast.error(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <Component>
      <HeaderWithCloseButton
        title="Регистрация"
        color="white"
        margin="0 0 20px 0"
        background={colors.green["green"]}
        onClose={onClose}
      />
      <FormContainer>
        <AuthForm
          data={data}
          errors={errors}
          register={register}
          isRegister={true}
          watch={watch}
          setValue={setValue}
          color={color}
          onColorChange={handleColorChange}
        />
        <ButtonStyled
          title="Регистрация"
          style="REGISTER"
          width="200px"
          height="50px"
          fontSize="16px"
          variant="contained"
          onClick={handleSubmit(onSubmit)}
        />
      </FormContainer>
      <PolisiesLinks setState={setState} />

      <LoaderFullWindow isLoading={isLoading} />
      <PageDialogs state={state} setState={setState} />
    </Component>
  );
});

export default Register;
