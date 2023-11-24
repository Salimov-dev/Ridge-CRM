import { Box, styled } from "@mui/material";
import { useSelector } from "react-redux";
import {
  getCurrentUserData,
  getUsersLoadingStatus,
} from "../../../../store/user/users.store";
import UserMenu from "./user-menu";
import Loader from "../../../common/loader/loader";
// import { isTokenExpired } from "../../../../services/user/local.storage-service";

const Component = styled(Box)`
  display: flex;
`;

const TopBarRightSide = () => {
  const currentUser = useSelector(getCurrentUserData());
  const isLoading = useSelector(getUsersLoadingStatus());
  // const isTokenExpiredToken = isTokenExpired()

  return (
    <Component>
      {!isLoading  ? (
        currentUser ? (
          <UserMenu currentUser={currentUser} />
        ) : null
      ) : (
        <Loader />
      )}
    </Component>
  );
};

export default TopBarRightSide;
