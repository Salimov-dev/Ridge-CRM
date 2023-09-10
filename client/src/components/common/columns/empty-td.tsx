import { Box } from "@mui/material";
import { AlignCenter } from "./styled";

const EmptyTd = () => {
  return (
    <Box sx={{ width: "100%" }}>
      <AlignCenter>-</AlignCenter>
    </Box>
  );
};

export default EmptyTd;
