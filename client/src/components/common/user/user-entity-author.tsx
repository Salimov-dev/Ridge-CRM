import useGetUserAvatar from "@hooks/user/use-get-user-avatar";
import { Box, Typography } from "@mui/material";
import UserNameWithAvatar from "./user-name-with-avatar";
import styled from "@emotion/styled";

const Component = styled(Box)`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  margin: 20px 0 0 0;
`;

const UserEntityAuthor = ({ title, userId }) => {
  const { getAvatarSrc, isLoading } = useGetUserAvatar(userId);

  return (
    <Component>
      <Typography>{title}:</Typography>
      <UserNameWithAvatar
        userId={userId}
        avatarSrc={getAvatarSrc()}
        isLoading={isLoading}
      />
    </Component>
  );
};

export default UserEntityAuthor;
