import React from "react";
import { FormatManagerName } from "../table/helpers/helpers";
import { Box, Typography, styled } from "@mui/material";
import AvatarImage from "@layouts/profile/components/avatar-image.profile-layout";

const Component = styled(Box)`
  display: flex;
  gap: 6px;
  align-items: center;
  justify-content: center;
`;

const UserNameWithAvatar = React.memo(
  ({
    userId,
    avatarSrc,
    isLoading,
    fontStyle = "normal",
    withName = true,
    color = "white",
    margin = "0"
  }) => {
    return (
      <Component sx={{ margin }}>
        <AvatarImage
          width="30px"
          height="30px"
          avatarSrc={avatarSrc}
          isLoading={isLoading}
        />
        {withName && (
          <Typography
            sx={{ width: "100%", fontStyle: fontStyle, color: color }}
          >
            {FormatManagerName(userId)}
          </Typography>
        )}
      </Component>
    );
  }
);

export default UserNameWithAvatar;
