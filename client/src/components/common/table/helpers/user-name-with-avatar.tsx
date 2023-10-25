import { Box } from "@mui/material";
import basicAva from "../../../../assets/basic-ava.jpg";
import { FormatManagerName, UserAvatar } from "./helpers";

const UserNameWithAvatar = ({ user }) => {
  const userId = user?._id;
  const ava = user?.image;
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        gap: "6px",
        alignItems: "center",
        justifyContent: "start",
      }}
    >
      <UserAvatar width="24px" path={ava ? ava : basicAva} />
      {FormatManagerName(userId)}
    </Box>
  );
};

export default UserNameWithAvatar;
