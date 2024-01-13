import React, { useState } from "react";
import { Box, styled } from "@mui/material";
import Register from "./components/register";
import Login from "./components/login";
import Subtitle from "./components/subtitle";

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
        <Register onClose={onClose} page={page} />
      ) : (
        <Login onClose={onClose} page={page} />
      )}
      {page === "register" ? (
        <Subtitle
          title=" Уже есть аккаунт? Нажмите, чтобы войти"
          onClick={() => setPage("login")}
        />
      ) : (
        <Subtitle
          title="  Нет аккаунта? Пройти регистрацию"
          onClick={() => setPage("register")}
        />
      )}
    </Component>
  );
});

export default AuthPage;
