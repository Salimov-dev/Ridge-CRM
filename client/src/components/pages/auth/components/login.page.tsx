// libraries
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useTheme } from "@emotion/react";
import { tokens } from "@theme/theme";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, styled } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
// components
import ButtonStyled from "@components/common/buttons/button-styled.button";
import LoaderFullWindow from "@components/common/loader/loader-full-window";
import HeaderWithCloseButton from "@components/common/page-headers/header-with-close-button";
import PageDialogs from "@components/common/dialog/page-dialogs";
import ForgotPasswordUI from "@components/UI/forgot-password/forgot-pasword.ui";
// initial-states
import { loginPageInitialState } from "@initial-states/auth/login-page.initial-state";
// forms
import AuthForm from "@forms/user/auth-form";
// schema
import { loginSchema } from "@schemas/auth/login.schema";
// store
import { login } from "@store/user/users.store";

const Component = styled(Box)`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

const FormContainer = styled(Box)`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: start;
  align-items: center;
  flex-direction: column;
`;

const LoginPage = React.memo(({ onClose }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [isLoading, setIsLoading] = useState(false);
  const [stateDialogPages, setStateDialogPages] = useState({
    registerPage: false
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: loginPageInitialState,
    mode: "onSubmit",
    resolver: yupResolver(loginSchema)
  });

  const data = watch();
  const location = useLocation();
  const redirectPath = location.state?.path || "/objects";

  const onSubmit = () => {
    setIsLoading(true);
    dispatch<any>(login(data))
      .then(() => {
        navigate(redirectPath, { replace: true });
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
        title="Вход в систему"
        color="white"
        margin="0 0 20px 0"
        background={colors.cancel["fireBrick"]}
        onClose={onClose}
      />
      <FormContainer>
        <AuthForm data={data} errors={errors} register={register} />
        <ButtonStyled
          title="Войти"
          style="SUCCESS"
          onClick={handleSubmit(onSubmit)}
        />
      </FormContainer>
      <ForgotPasswordUI />
      <LoaderFullWindow isLoading={isLoading} />
      <PageDialogs state={stateDialogPages} setState={setStateDialogPages} />
    </Component>
  );
});

export default LoginPage;
