import { Box,styled } from "@mui/material";
import Loader from "../../../components/common/loader/loader";

const Avatar = styled("img")({
  width: "200px",
  borderRadius: "20px",
});

const AvatarImage = ({ avatarSrc }) => {
  return (
    <Box>
      {avatarSrc ? (
        <Avatar src={avatarSrc} alt="User Avatar" />
      ) : (
        <Loader width="200px"/>
      )}
    </Box>
  );
};

export default AvatarImage;
