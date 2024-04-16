import { Box, styled } from "@mui/material";
import basicAva from "@assets/basic-ava.jpg";
import Loader from "@components/common/loader/loader";

const Component = styled(Box)`
  display: flex;
`;

const Avatar = styled("img")({
  borderRadius: "50%"
});

const AvatarImageProfileLayout = ({
  avatarSrc,
  width = "150px",
  height = "150px",
  isLoading
}) => {
  return !isLoading ? (
    <Component>
      <Avatar
        src={avatarSrc ? avatarSrc : basicAva}
        alt="User Avatar"
        sx={{ width, height, border: "1px solid MidnightBlue" }}
      />
    </Component>
  ) : (
    <Loader height={height} width={width} padding="0" size={20} />
  );
};

export default AvatarImageProfileLayout;
