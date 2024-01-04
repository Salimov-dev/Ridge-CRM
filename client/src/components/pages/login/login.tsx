// libraries
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Typography, styled } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
// components
import LoginForm from "../../../layouts/login/components/login-form";
import LoginHeader from "./components/login-header";
// schema
import { loginSchema } from "../../../schemas/login-schema";
// store
import { login } from "../../../store/user/users.store";
import ButtonStyled from "@components/common/buttons/button-styled.button";
import LoaderFullWindow from "@components/common/loader/loader-full-window";

const Component = styled(Box)`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
`;

const AuthForm = styled(Box)`
  height: 100%;
  width: 350px;
  display: flex;
  justify-content: start;
  align-items: center;
  flex-direction: column;
`;

const Subtitle = styled(Box)`
  width: 100%;
  display: flex;
  padding: 0 10px;
  justify-content: start;
`;

const initialState = {
  email: "",
  password: "",
};

const Login = React.memo(({ onClose }) => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: initialState,
    mode: "onBlur",
    resolver: yupResolver(loginSchema),
  });

  const data = watch();
  const location = useLocation();
  const redirectPath = location.state?.path || "/";
  const isFormValid = !Object.keys(errors).length;

  const onSubmit = () => {
    setIsLoading(true);
    dispatch<any>(login({ payload: data }))
      .then(() => {
        setIsLoading(false);
        navigate(redirectPath, { replace: true });
        onClose();
      })
      .catch((error) => {
        const { message } = error.response.data.error;
        toast.error(message);
        setIsLoading(false);
      });
  };

  return (
    <Component>
      <LoginHeader
        title="Авторизация"
        background="red"
        color="white"
        onClose={onClose}
      />
      <LoaderFullWindow isLoading={isLoading} />
      ) : (
        <AuthForm>
          <LoginForm data={data} errors={errors} register={register} />
          {/* <Subtitle>
            <Typography sx={{ marginBottom: "10px" }}>
              Нет логина? Нажмите, чтобы получить доступ
            </Typography>
          </Subtitle> */}
          <ButtonStyled
            title="Войти"
            style="SUCCESS"
            onClick={handleSubmit(onSubmit)}
            disabled={!isFormValid}
          />
        </AuthForm>
      )}
    </Component>
  );
});

export default Login;
