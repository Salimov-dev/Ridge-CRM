import { useSelector } from "react-redux";
import styled from "@emotion/styled";
import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import RowTitle from "@components/common/titles/row-title";
import { getCurrentUserData } from "@store/user/users.store";

const StyledLink = styled(Link)({
  textDecoration: "none",
  color: "inherit",
  borderBottom: "1px solid transparent",
  transition: "border-bottom-color 0.3s",

  // Добавляем подчеркивание при наведении на ссылку
  "&:hover": {
    borderBottomColor: "#000", // Цвет подчеркивания при наведении
    color: "yellow",
    textDecoration: "underline"
  }
});

const AccountInfo = () => {
  const currentUserData = useSelector(getCurrentUserData());
  const currentUserName = `${currentUserData?.lastName} ${currentUserData?.firstName} ${currentUserData?.surName}`;
  const isUserNameFilledUp = currentUserName?.includes(null);

  return (
    <Box sx={{ marginBottom: "20px" }}>
      <RowTitle title="Куратор команды" background="red" />

      {!isUserNameFilledUp ? (
        <Typography variant="h4">{currentUserName}</Typography>
      ) : (
        <Box sx={{ width: "fit-content" }}>
          <StyledLink to="/profile">
            <Typography variant="h4">Заполните свой Профиль</Typography>
          </StyledLink>
        </Box>
      )}
    </Box>
  );
};

export default AccountInfo;
