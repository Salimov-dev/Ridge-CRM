import { Box, Typography, styled } from "@mui/material";
import { FormatManagerName } from "./helpers";
import UserAvatar from "../../avatar/user-avatar";
import React from "react";

const Component = styled(Box)`
  display: flex;
  gap: 6px;
  align-items: center;
  justify-content: start;
`;

const UserNameWithAvatar = React.memo( ({ userId, avatarSrc, fontStyle = 'normal' }) => {

  return (
    <Component>
      <UserAvatar avatarSrc={avatarSrc}/>
      <Typography sx={{fontStyle: fontStyle}}>{FormatManagerName(userId)}</Typography>
    </Component>
  );
});

export default UserNameWithAvatar;
