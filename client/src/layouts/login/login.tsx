// libraries
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
// MUI
import { Typography } from "@mui/material";
// store
import { login } from "../../store/user/users.store";
// components
import LoginForm from "./components/login-form";
import { Component, AuthForm, Title } from "./styled/styled";
import { loginSchema } from "../../schemas/login-schema";

const Login = () => {
  const {
    register,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onBlur",
    resolver: yupResolver(loginSchema),
  });

  const [data, setData] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ payload: data }));
    navigate("/");
  };

  const isFormValid = !Object.keys(errors).length;

  return (
    <>
      <Component>
        <AuthForm>
          <Title>
            <Typography variant="h5">Войти</Typography>
          </Title>
          <LoginForm
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

export default Login;
