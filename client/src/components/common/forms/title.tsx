import { Box, Typography } from "@mui/material";

const Title = ({ title }) => {
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "flex-start",
        margin: "12px 0 6px 0",
      }}
    >
      <Typography variant="h5">{title}</Typography>
    </Box>
  );
};

export default Title;
