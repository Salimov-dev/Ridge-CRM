// libraries
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// MUI
import { Box, Button, Menu, MenuItem, Typography, styled } from "@mui/material";
// store
import { getCurrentUserId, logOut } from "../../../../store/user/users.store";
// assets
import basicAva from "../../../../assets/basic-ava.jpg"
import UserAvatar from "../../../common/avatar/user-avatar";
import useGetUserAvatar from "../../../../hooks/user/use-get-user-avatar";

import { io } from "socket.io-client";
import configFile from "../../../../config.json";

const Component = styled(Box)`
  display: flex;
  gap: 12px;
  margin-left: 0px;
`;

const UserName = styled(Typography)`
  color: gray;
`;

// const Avatar = styled(`img`)({
//   width: "30px",
//   borderRadius: "50%",
//   marginRight: "10px",
// });

const UserMenu = ({ currentUser }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const open = Boolean(anchorEl);
  const currentUserId = useSelector(getCurrentUserId());
  const {avatarSrc, refreshAvatar} = useGetUserAvatar(currentUserId);

  const socket = io(configFile.ioEndPoint);

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
        <UserAvatar avatarSrc={avatarSrc}/>
        <UserName
          sx={{
            color: open ? "white !important" : "gray",
            marginLeft: '6px'
          }}
        >
          {currentUser?.name?.firstName}
        </UserName>
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
