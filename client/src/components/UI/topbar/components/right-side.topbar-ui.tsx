import { useState } from "react";
import { Box, styled } from "@mui/material";
import { useSelector } from "react-redux";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
// components
import Loader from "@common/loader/loader";
import ButtonStyled from "@components/common/buttons/button-styled.button";
import PersonAddAlt1OutlinedIcon from "@mui/icons-material/PersonAddAlt1Outlined";
import UserMenuTopbar from "./user-menu.topbar-ui";
// hooks
// store
import {
  getCurrentUserData,
  getIsLoggedIn,
  getUsersLoadingStatus
} from "@store/user/users.store";
import authDialogsState from "@dialogs/dialog-handlers/auth.dialog-handlers";
import DialogPages from "@dialogs/dialog-pages";

const Component = styled(Box)`
  display: flex;
  justify-content: end;
  align-items: center;
`;

const TopBarRightSide = () => {
  const [state, setState] = useState({
    loginPage: false,
    registerPage: false,
    authPage: false,
    startPage: ""
  });

  const currentUser = useSelector(getCurrentUserData());
  const { handleOpenAuthPage } = authDialogsState({ setState });

  const isLoading = useSelector(getUsersLoadingStatus());
  const isLoggedIn = useSelector(getIsLoggedIn());

  return (
    <Component
      sx={{
        paddingTop: isLoggedIn ? "0" : "10px",
        marginRight: isLoggedIn ? "0" : "-10px"
      }}
    >
      {!isLoading ? (
        currentUser ? (
          <UserMenuTopbar />
        ) : (
          <Box sx={{ width: "100%", display: "flex", gap: "4px" }}>
            <ButtonStyled
              title="Регистрация"
              style="REGISTER"
              variant="contained"
              onClick={() => handleOpenAuthPage("register")}
              icon={<PersonAddAlt1OutlinedIcon />}
            />

            <ButtonStyled
              title="Войти"
              style="MANAGER_TASK"
              variant="contained"
              onClick={() => handleOpenAuthPage("login")}
              icon={<LockOutlinedIcon />}
            />
          </Box>
        )
      ) : (
        <Loader height="40px" width="60px" padding="0" size={20} />
      )}
      <DialogPages state={state} setState={setState} />
    </Component>
  );
};

export default TopBarRightSide;
