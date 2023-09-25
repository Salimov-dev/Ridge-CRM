// libraries
import { useSelector } from "react-redux";
// MUI
import { Box, Button } from "@mui/material";
// styled
import { Component, RightSide } from "./styled/styled";
// components
import UserMenu from "./components/user-menu";
import Loader from "../../common/loader/loader";
// store
import {
  getCurrentUserData,
  getUsersLoadingStatus,
} from "../../../store/user/users.store";
import { useNavigate } from "react-router-dom";

const TopBar = () => {
  const currentUser = useSelector(getCurrentUserData());
  const isLoading = useSelector(getUsersLoadingStatus());
  const navigate = useNavigate();
  return (
    <Component>
      <Box sx={{ m: "auto 0" }}></Box>
      <RightSide>
        {!isLoading ? (
          <>
            {currentUser ? (
              <UserMenu currentUser={currentUser} />
            ) : (
              <Button onClick={() => navigate("auth/login")}>Войти</Button>
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
