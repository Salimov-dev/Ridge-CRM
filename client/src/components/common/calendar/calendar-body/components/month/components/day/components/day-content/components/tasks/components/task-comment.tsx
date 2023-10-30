import { Box, Typography } from "@mui/material";
import Truncate from "react-truncate";

const TaskComment = ({ comment }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
      }}
    >
      <Truncate lines={2} ellipsis="...">
        <Typography>
          <b>Задача:</b> {comment}
        </Typography>
      </Truncate>
    </Box>
  );
};

export default TaskComment;
