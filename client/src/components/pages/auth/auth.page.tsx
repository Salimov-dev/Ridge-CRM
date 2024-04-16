import React, { useState } from "react";
import { Box, styled } from "@mui/material";
import LoginPage from "./components/login.page";
import RegisterPage from "./components/register.page";
import SubtitleRegisterLoginPage from "./components/subtitle.register-login-page";

const Component = styled(Box)`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
`;

const AuthPage = React.memo(({ onClose, startPage = "" }) => {
  const [page, setPage] = useState(startPage);

  return (
    <Component>
      {page === "register" ? (
        <RegisterPage onClose={onClose} />
      ) : (
        <LoginPage onClose={onClose} />
      )}
      {page === "register" ? (
        <SubtitleRegisterLoginPage
          title=" Уже есть аккаунт? Нажмите, чтобы войти"
          onClick={() => setPage("login")}
          backgroundColor="fireBrick"
        />
      ) : (
        <SubtitleRegisterLoginPage
          title="Нет аккаунта? Пройти регистрацию"
          onClick={() => setPage("register")}
          backgroundColor="green"
        />
      )}
    </Component>
  );
});

export default AuthPage;
