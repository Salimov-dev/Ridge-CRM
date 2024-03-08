import { useSelector } from "react-redux";
import styled from "@emotion/styled";
import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import RowTitle from "@components/common/titles/row-title";
import { getCurrentUserData } from "@store/user/users.store";

const StyledLink = styled(Link)({
  textDecoration: "none",
  borderBottom: "1px solid transparent",
  transition: "border-bottom-color 0.3s"
});

const AccountInfo = () => {
  const currentUserData = useSelector(getCurrentUserData());
  const currentUserName = `${currentUserData?.lastName} ${currentUserData?.firstName} ${currentUserData?.surName}`;
  const isUserNameFilledUp = currentUserName?.includes(null);

  return (
    <Box sx={{ marginBottom: "20px" }}>
      <RowTitle
        title="Куратор команды"
        background="linear-gradient(to right, red , firebrick)"
      />

      {!isUserNameFilledUp ? (
        <Typography variant="h4">{currentUserName}</Typography>
      ) : (
        <Box sx={{ width: "fit-content" }}>
          <StyledLink to="/profile">
            <Typography
              variant="h4"
              sx={{
                color: "Coral",
                "&:hover": {
                  color: "red",
                  textDecoration: "underline"
                }
              }}
            >
              Заполните свой Профиль
            </Typography>
          </StyledLink>
        </Box>
      )}
    </Box>
  );
};

export default AccountInfo;
