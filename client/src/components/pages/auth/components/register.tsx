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
import AuthForm from "@components/common/forms/auth-form";
import PageDialogs from "@components/common/dialog/page-dialogs";
// schema
import { loginSchema } from "@schemas/login.schema";
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
  width: 350px;
  display: flex;
  justify-content: start;
  align-items: center;
  flex-direction: column;
`;

const initialState = {
  email: "",
  password: ""
};

const Register = React.memo(({ page, onClose }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [isLoading, setIsLoading] = useState(false);
  const [state, setState] = useState({
    loginPage: false
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: initialState,
    mode: "onSubmit",
    resolver: yupResolver(loginSchema)
  });

  const data = watch();
  const location = useLocation();
  const redirectPath = location.state?.path || "/objects";

  const onSubmit = () => {
    setIsLoading(true);
    const newData = { email: data.email, password: data.password };

    dispatch<any>(signUp(newData))
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
        title="Регистрация"
        color="white"
        margin="0 0 20px 0"
        background={colors.green["green"]}
        onClose={onClose}
      />
      <LoaderFullWindow isLoading={isLoading} />

      <FormContainer>
        <AuthForm
          data={data}
          errors={errors}
          register={register}
          startPage={page}
        />
        <ButtonStyled
          title="Регистрация"
          style="SUCCESS"
          onClick={handleSubmit(onSubmit)}
        />
      </FormContainer>
      <PageDialogs state={state} setState={setState} />
    </Component>
  );
});

export default Register;
