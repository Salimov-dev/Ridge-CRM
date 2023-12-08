import { Box,styled } from "@mui/material";
import basicAva from "../../../assets/basic-ava.jpg"

const Avatar = styled("img")({
  width: "200px",
  borderRadius: "50%",
});

const AvatarImage = ({ avatarSrc }) => {
  return (
    <Box>
      {avatarSrc ? (
        <Avatar src={avatarSrc} alt="User Avatar" />
        ) : (
        <Avatar src={basicAva} alt="User Avatar" />
      )}
    </Box>
  );
};

export default AvatarImage;
