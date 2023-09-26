// libraries
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
// MUI
import { Box, Typography, styled } from "@mui/material";
// store
import { getCurrentUserId, login } from "../../store/user/users.store";
// components
import LoginForm from "./components/login-form";
import PositiveOutlinedButton from "../../components/common/buttons/positive-outlined-button";
// schema
import { loginSchema } from "../../schemas/login-schema";

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
  width: 300px;
  display: flex;
  justify-content: start;
  align-items: center;
  flex-direction: column;
  padding: 20px 20px 50px 20px;
`;

const Title = styled(Box)`
  display: flex;
  padding: 10px;
  justify-content: center;
`;

const Logo = styled(Box)`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const initialState = {
  email: "",
  password: "",
};

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation()

  const redirectPath = location.state?.path || "/"

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
  const isFormValid = !Object.keys(errors).length;

  const onSubmit = () => {
    dispatch(login({ payload: data }))
      .then(() => navigate(redirectPath, { replace: true }))
      .then(() => toast.success("Добро пожаловать!"));
  };

  return (
    <Component>
      <Logo>
        <Typography
          sx={{ fontSize: "80px", fontWeight: "700", marginBottom: "-10px" }}
        >
          Г Р Я Д К А
        </Typography>
        <Typography sx={{ fontSize: "13px" }}>
          НАША СИСТЕМА АВТОМАТИЗАЦИИ ДЛЯ ОТДЕЛОВ РАЗВИТИЯ
        </Typography>
      </Logo>
      <AuthForm>
        <Title>
          <Typography sx={{ fontSize: "16px" }}>
            Авторизуйтесь в системе:
          </Typography>
        </Title>
        <LoginForm data={data} errors={errors} register={register} />
        <PositiveOutlinedButton
          title="Войти"
          isValid={!isFormValid}
          onClick={handleSubmit(onSubmit)}
        />
      </AuthForm>
    </Component>
  );
};

export default Login;
