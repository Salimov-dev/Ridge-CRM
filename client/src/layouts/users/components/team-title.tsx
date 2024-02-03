import { Box, Typography } from "@mui/material";

const TeamTitle = ({ title, background }) => {
  return (
    <Box sx={{ width: "fit-content" }}>
      <Typography
        variant="h4"
        sx={{ margin: "10px 0", padding: "0 4px", background: background }}
      >
        {title}
      </Typography>
    </Box>
  );
};

export default TeamTitle;
