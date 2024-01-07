import { useState } from "react";
import { Box, styled } from "@mui/material";
import { useSelector } from "react-redux";
// components
import Loader from "@common/loader/loader";
import ButtonStyled from "@components/common/buttons/button-styled.button";
import PageDialogs from "@components/common/dialog/page-dialogs";
// hooks
import useDialogHandlers from "@hooks/dialog/use-dialog-handlers";
// store
import {
  getCurrentUserData,
  getUsersLoadingStatus,
} from "@store/user/users.store";
import UserMenu from "./user-menu";

const Component = styled(Box)`
  width: 100%;
  display: flex;
  justify-content: end;
  padding-top: 10px;
`;

const TopBarRightSide = () => {
  const [state, setState] = useState({
    loginPage: false,
  });

  const currentUser = useSelector(getCurrentUserData());
  const { handleOpenLoginPage } = useDialogHandlers(setState);

  const isLoading = useSelector(getUsersLoadingStatus());

  return (
    <Component>
      {!isLoading ? (
        currentUser ? (
          <UserMenu currentUser={currentUser} />
        ) : (
          <Box sx={{ display: "flex", gap: "4px" }}>
            <ButtonStyled
              title="Регистрация"
              style="MY_TASK"
              variant="contained"
              onClick={handleOpenLoginPage}
            />
            <ButtonStyled
              title="Войти"
              style="MANAGER_TASK"
              variant="contained"
              onClick={handleOpenLoginPage}
            />
          </Box>
        )
      ) : (
        <Loader height="40px" width="60px" padding="0" size={20} />
      )}
      <PageDialogs state={state} setState={setState} />
    </Component>
  );
};

export default TopBarRightSide;
