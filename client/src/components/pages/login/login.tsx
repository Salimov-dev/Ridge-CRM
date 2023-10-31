// liraries
import { useDispatch } from "react-redux";
// components
import IsLoadingDialog from "../../common/dialog/is-loading-dialog";
import { Box, Typography, styled } from "@mui/material";
import LoginForm from "../../../layouts/login/components/login-form";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { login } from "../../../store/user/users.store";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../../../schemas/login-schema";
import PositiveOutlinedButton from "../../common/buttons/positive-outlined-button";
import LoginHeader from "./components/login-header";
import { toast } from "react-toastify";

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

const Login = ({ onClose }) => {
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
        toast.warn(error)
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
      {isLoading ? (
        <IsLoadingDialog
          text="Немного подождите, авторизуемся в системе"
          isLoading={isLoading}
        />
      ) : (
        <AuthForm>
          <LoginForm data={data} errors={errors} register={register} />
          <Subtitle>
            <Typography sx={{ marginBottom: "10px" }}>
              Нет логина? Нажмите, чтобы получить доступ
            </Typography>
          </Subtitle>
          <PositiveOutlinedButton
            title="Войти"
            isValid={!isFormValid}
            onClick={handleSubmit(onSubmit)}
          />
        </AuthForm>
      )}
    </Component>
  );
};

export default Login;
