import { Box, Typography } from "@mui/material";

const TitleObjectsQuantityObjectsDatabaseLayout = ({ objects }) => {
  return (
    <Box sx={{ margin: "0 0 10px 0" }}>
      <Typography variant="h4">
        Объектов для проработки: {objects?.length}шт
      </Typography>
    </Box>
  );
};

export default TitleObjectsQuantityObjectsDatabaseLayout;
