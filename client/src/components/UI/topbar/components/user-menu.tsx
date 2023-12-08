// libraries
import { useState } from "react";
import { io } from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// MUI
import { Box, Button, Menu, MenuItem, Typography, styled } from "@mui/material";
// store
import { getCurrentUserId, logOut } from "../../../../store/user/users.store";
// commponents
import UserAvatar from "../../../common/avatar/user-avatar";
// hooks
import useGetUserAvatar from "../../../../hooks/user/use-get-user-avatar";
// config
import configFile from "../../../../config.json";
import AvatarImage from "../../../../layouts/profile/components/avatar-image";

const Component = styled(Box)`
  display: flex;
  gap: 12px;
  margin-left: 0px;
`;

const UserName = styled(Typography)`
  color: gray;
`;

const UserMenu = ({ currentUser }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const socket = io(configFile.ioEndPoint);

  const currentUserId = useSelector(getCurrentUserId());
  const { avatarSrc, isLoading, refreshAvatar } =
    useGetUserAvatar(currentUserId);

  socket.on("updateAvatar", async () => {
    refreshAvatar();
  });

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
            color: "white",
          },
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <AvatarImage
            width="30px"
            height="30px"
            avatarSrc={avatarSrc}
            isLoading={isLoading}
          />
          <UserName
            sx={{
              color: open ? "white !important" : "gray",
              marginLeft: "6px",
            }}
          >
            {currentUser?.name?.firstName}
          </UserName>
        </Box>
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={handleOpenProfile}>Профиль</MenuItem>
        <MenuItem onClick={handleLogOut}>Выйти</MenuItem>
      </Menu>
    </Component>
  );
};

export default UserMenu;
