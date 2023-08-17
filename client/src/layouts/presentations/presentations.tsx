import { Typography, Tooltip, Box, Button } from "@mui/material";
import LayoutTitle from "../../components/common/page-titles/layout-title";

const Presentations = () => {
  return (
    <Box>
      <LayoutTitle title="Презентации"/>
      <Button variant="outlined" color="success">Добавить презентацию</Button>
    </Box>
  );
};

export default Presentations;
