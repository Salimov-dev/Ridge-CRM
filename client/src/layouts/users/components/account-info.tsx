import { useSelector } from "react-redux";
import { Box, Typography } from "@mui/material";
import RowTitle from "@components/common/titles/row-title";
import { getCurrentUserData } from "@store/user/users.store";
import LinkStyled from "@components/common/link/link-styled";

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
          <LinkStyled path="/profile">
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
          </LinkStyled>
        </Box>
      )}
    </Box>
  );
};

export default AccountInfo;
