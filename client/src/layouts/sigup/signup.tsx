// libraries
import * as yup from "yup";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
// MUI
import styled from "@emotion/styled";
import { Box, Button, Typography, Paper } from "@mui/material";
import KeyboardArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardArrowLeftOutlined";
// store
import { login, signUp } from "../../store/user/users.store";
// components
import SignUpForm from "../../components/UI/signup/signup-form";

const Component = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const AuthForm = styled(Paper)`
  padding: 20px 20px 50px 20px;
  width: 400px;
`;

const Title = styled(Box)`
  display: flex;
  padding: 20px;
  justify-content: center;
`;

const BackButton = styled(Box)`
  padding: 20px 0 0 20px;
  margin-top: 60px;
`;

const schema = yup.object().shape({
  name: yup
    .string()
    .matches(/^([^0-9]*$)/, "Имя не должно содержать цифры")
    .required("Имя обязательно для заполнения"),
  email: yup
    .string()
    .email("Введите email корректно")
    .required("Email обязателен для заполнения"),
  password: yup
    .string()
    .min(8, "Слишком короткий пароль - введите не менее 8 символов")
    .required("Пароль обязателен для заполнения"),
});

const SignUp = () => {
  const {
    register,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    dispatch(signUp(data));
    dispatch(login({ payload: data }));
    navigate("/");
  };

  const handleNavigate = () => {
    navigate("/");
  };

  const isFormValid = !Object.keys(errors).length;

  return (
    <>
      <BackButton>
        <Button onClick={handleNavigate}>
          <KeyboardArrowLeftOutlinedIcon sx={{ paddingBottom: "2px" }} />
          На главную
        </Button>
      </BackButton>
      <Component>
        <AuthForm>
          <Title>
            <Typography variant="h5">Зарегистрироваться</Typography>
          </Title>
          <SignUpForm
            data={data}
            onSubmit={handleSubmit}
            onChange={handleChange}
            errors={errors}
            register={register}
            isFormValid={isFormValid}
          />
        </AuthForm>
      </Component>
    </>
  );
};

export default SignUp;
