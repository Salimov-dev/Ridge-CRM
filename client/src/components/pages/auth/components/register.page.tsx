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
import HeaderWithCloseButtonForPage from "@components/common/headers/header-with-close-button.page";
import AuthForm from "@forms/auth/auth-form";
import PolisiesLinksRegisterPage from "./policies-links.register-page";
// initial-states
import { registerPageInitialState } from "@initial-states/auth/register-page.initial-state";
// schema
import { registerSchema } from "@schemas/auth/register.schema";
// store
import { signUp } from "@store/user/users.store";
import DialogPages from "@dialogs/dialog-pages";

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

const RegisterPage = React.memo(({ onClose }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [color, setColor] = useState();
  const [stateDialogPages, setStateDialogPages] = useState({
    loginPage: false,
    agreementPage: false,
    personalPolicyPage: false
  });

  const {
    register,
    watch,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm({
    defaultValues: registerPageInitialState,
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
      <HeaderWithCloseButtonForPage
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
      <PolisiesLinksRegisterPage setState={setStateDialogPages} />

      <LoaderFullWindow isLoading={isLoading} />
      <DialogPages state={stateDialogPages} setState={setStateDialogPages} />
    </Component>
  );
});

export default RegisterPage;
