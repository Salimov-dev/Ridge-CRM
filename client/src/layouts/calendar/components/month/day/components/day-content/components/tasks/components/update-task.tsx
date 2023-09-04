import { Box } from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

const UpdateTask = ({ onClick, isTaskDone }) => {
  return !isTaskDone ? (
    <Box onClick={onClick}>
      <EditOutlinedIcon
        sx={{
          opacity: "0.5",
          "&:hover": { opacity: "1", transform: "scale(1.2)" },
        }}
      />
    </Box>
  ) : null;
};

export default UpdateTask;
