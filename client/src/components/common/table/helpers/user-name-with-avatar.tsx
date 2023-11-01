import { Box, Typography, styled } from "@mui/material";
import basicAva from "../../../../assets/basic-ava.jpg";
import { FormatManagerName, UserAvatar } from "./helpers";

const Component = styled(Box)`
  width: 100%;
  display: flex;
  gap: 6px;
  align-items: center;
  justify-content: start;
`;

const UserNameWithAvatar = ({ user, fontStyle = 'normal' }) => {
  const userId = user?._id;
  const ava = user?.image;
  return (
    <Component>
      <UserAvatar width="24px" path={ava ? ava : basicAva} />
      <Typography sx={{fontStyle: fontStyle}}>{FormatManagerName(userId)}</Typography>
    </Component>
  );
};

export default UserNameWithAvatar;
