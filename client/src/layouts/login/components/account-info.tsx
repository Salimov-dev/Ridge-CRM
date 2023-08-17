import styled from "@emotion/styled";
import { Box, Typography, Link, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { tokens } from "../../../theme";

const Account = styled(Box)`
  display: flex;
  gap: 6px;
`;

const LinkStyled = styled(Link)`
  cursor: pointer;
  color: #6870fa;
`;

const AccountLogin = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("signup");
  };
  return (
    <Account>
      <Typography>Нет аккаунта?</Typography>
      <LinkStyled onClick={handleClick}>Зарегистрироваться</LinkStyled>
    </Account>
  );
};

export default AccountLogin;
