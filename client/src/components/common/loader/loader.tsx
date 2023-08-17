import { CircularProgress, Box } from "@mui/material";

const Loader = ({ size = 25, width = '100%' }) => {
  return (
    <Box
      sx={{
        width: {width},
        height: "100%",
        padding: "30px 0",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CircularProgress color="success" size={size} />
    </Box>
  );
};

export default Loader;
