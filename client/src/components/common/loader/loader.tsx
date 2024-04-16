import { CircularProgress, Box, styled } from "@mui/material";

const Components = styled(Box)`
  display: flex;
  justifycontent: center;
  align-items: center;
`;

const Loader = ({
  size = 25,
  color = "white",
  width = "100%",
  height = "100%",
  padding = "30px 0"
}) => {
  return (
    <Components
      sx={{
        width: { width },
        height: { height },
        padding: padding
      }}
    >
      <CircularProgress sx={{ color: color }} size={size} />
    </Components>
  );
};

export default Loader;
