import { Box, Typography } from "@mui/material";

const TaskComment = ({ comment }) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      <Typography>
        <b>Задача:</b> {comment}
      </Typography>
    </Box>
  );
};

export default TaskComment;
