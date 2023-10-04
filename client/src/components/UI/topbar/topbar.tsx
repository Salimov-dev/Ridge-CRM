// libraries
import { useSelector } from "react-redux";
// MUI
import { Box, styled } from "@mui/material";
// components
import UserMenu from "./components/user-menu";
import Loader from "../../common/loader/loader";
// store
import {
  getCurrentUserData,
  getUsersLoadingStatus,
} from "../../../store/user/users.store";

const Component = styled(Box)`
  display: flex;
  justify-content: space-between;
  padding: 17px 0 0 0;
  margin-bottom: 6px;
`;

const RightSide = styled(Box)`
  display: flex;
`;

const TopBar = () => {
  const currentUser = useSelector(getCurrentUserData());
  const isLoading = useSelector(getUsersLoadingStatus());

  return (
    <Component>
      <Box sx={{ m: "auto 0" }}></Box>
      <RightSide>
        {!isLoading ? (
          <>{currentUser ? <UserMenu currentUser={currentUser} /> : null}</>
        ) : (
          <Loader />
        )}
      </RightSide>
    </Component>
  );
};

export default TopBar;
