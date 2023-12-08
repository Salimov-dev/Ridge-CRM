import { Box, styled } from "@mui/material";
import basicAva from "../../../assets/basic-ava.jpg";
import Loader from "../../../components/common/loader/loader";

const Component = styled(Box)`
  display: flex;
`;

const Avatar = styled("img")({
  borderRadius: "50%",
});

const AvatarImage = ({
  avatarSrc,
  width = "150px",
  height = "150px",
  isLoading,
}) => {
  return !isLoading ? (
    <Component>
      {avatarSrc ? (
        <Avatar src={avatarSrc} alt="User Avatar" sx={{ width, height }} />
      ) : (
        <Avatar src={basicAva} alt="User Avatar" sx={{ width, height }} />
      )}
    </Component>
  ) : (
    <Loader height={height} width={width} padding="0" size={20}/>
  );
};

export default AvatarImage;
