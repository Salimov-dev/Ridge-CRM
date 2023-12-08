import { Box, styled } from "@mui/material";
import { useSelector } from "react-redux";
import {
  getCurrentUserData,
  getUsersLoadingStatus,
} from "../../../../store/user/users.store";
import UserMenu from "./user-menu";
import Loader from "../../../common/loader/loader";

const Component = styled(Box)`
  display: flex;
`;

const TopBarRightSide = () => {
  const currentUser = useSelector(getCurrentUserData());
  const isLoading = useSelector(getUsersLoadingStatus());

  return (
    <Component>
      {!isLoading  ? (
        currentUser ? (
          <UserMenu currentUser={currentUser} />
        ) : null
      ) : (
        <Loader height="40px" width="60px" padding="0" size={20}/>
      )}
    </Component>
  );
};

export default TopBarRightSide;
