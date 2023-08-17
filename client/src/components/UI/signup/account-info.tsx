import styled from "@emotion/styled";
import { Box, Typography, Link } from "@mui/material";
import { useNavigate } from "react-router-dom";

const LinkStyled = styled(Link)`
  cursor: pointer;
`;

const Account = styled(Box)`
  display: flex;
  gap: 6px;
`;

const AccountSignUp = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("login");
  };

  return (
    <Account>
      <Typography>Есть аккаунт?</Typography>
      <LinkStyled onClick={handleClick}>Войти</LinkStyled>
    </Account>
  );
};

export default AccountSignUp;
