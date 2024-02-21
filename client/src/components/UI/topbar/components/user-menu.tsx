// libraries
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// MUI
import { Box, Button, Menu, MenuItem, Typography, styled } from "@mui/material";
// store
import { getCurrentUserId, logOut } from "@store/user/users.store";
// commponents
import UserNameWithAvatar from "@components/common/user-name-with-avatar";
// hooks
import useGetUserAvatar from "@hooks/user/use-get-user-avatar";

const Component = styled(Box)`
  display: flex;
  gap: 12px;
  margin-left: 0px;
`;

const UserMenu = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const currentUserId = useSelector(getCurrentUserId());
  const { isLoading, getAvatarSrc } = useGetUserAvatar(currentUserId);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOpenProfile = () => {
    setAnchorEl(null);
    navigate("profile");
  };

  const handleLogOut = () => {
    setAnchorEl(null);
    dispatch<any>(logOut());
    navigate("/");
  };

  return (
    <Component>
      <Button
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        sx={{
          "&:hover *": {
            color: "white"
          }
        }}
      >
        <UserNameWithAvatar
          userId={currentUserId}
          avatarSrc={getAvatarSrc()}
          isLoading={isLoading}
        />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button"
        }}
      >
        <MenuItem onClick={handleOpenProfile}>Профиль</MenuItem>
        <MenuItem onClick={handleLogOut}>Выйти</MenuItem>
      </Menu>
    </Component>
  );
};

export default UserMenu;
