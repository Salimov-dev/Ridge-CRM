import { Box } from "@mui/material";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";

const DoneStatusIcon = ({ isDone }) => {
  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      {!isDone ? (
        <CircleOutlinedIcon sx={{ color: "gray" }} />
      ) : (
        <CheckCircleOutlineOutlinedIcon sx={{ color: "green" }} />
      )}
    </Box>
  );
};

export default DoneStatusIcon;
