// libraries
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
// MUI
import { Box, IconButton, useTheme, Button } from "@mui/material";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
// styled
import { Component, RightSide } from "./styled/styled";
// components
import UserMenu from "./components/user-menu";
import Loader from "../../common/loader/loader";
// store
import {
  getCurrentUserData,
  getUsersLoadingStatus,
} from "../../../store/users.store";
// other
import { ColorModeContext } from "../../../theme";

const TopBar = () => {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
  const currentUser = useSelector(getCurrentUserData());
  const isLoading = useSelector(getUsersLoadingStatus());
  const navigate = useNavigate();
  
  const handleGoToLogin = () => {
    navigate("auth/login");
  };

  return (
    <Component>
      <Box sx={{ m: "auto 0" }}></Box>
      <RightSide>
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>
        <IconButton>
          <NotificationsOutlinedIcon />
        </IconButton>
        <IconButton>
          <SettingsOutlinedIcon />
        </IconButton>

        {!isLoading ? (
          <>
            {currentUser ? (
              <UserMenu currentUser={currentUser} />
            ) : (
              <Button
                variant="contained"
                onClick={handleGoToLogin}
                color="success"
              >
                Войти
              </Button>
            )}
          </>
        ) : (
          <Loader />
        )}
      </RightSide>
    </Component>
  );
};

export default TopBar;
