import React from "react";
import { FormatManagerName } from "../helpers/helpers";
import { Box, Typography, styled } from "@mui/material";
import AvatarImage from "../../../../layouts/profile/components/avatar-image";

const Component = styled(Box)`
  display: flex;
  gap: 6px;
  align-items: center;
  justify-content: start;
`;

const UserNameWithAvatar = React.memo(
  ({ userId, avatarSrc, isLoading, fontStyle = "normal" }) => {
    return (
      <Component>
        <AvatarImage
          width="30px"
          height="30px"
          avatarSrc={avatarSrc}
          isLoading={isLoading}
        />
        <Typography sx={{ fontStyle: fontStyle }}>
          {FormatManagerName(userId)}
        </Typography>
      </Component>
    );
  }
);

export default UserNameWithAvatar;
