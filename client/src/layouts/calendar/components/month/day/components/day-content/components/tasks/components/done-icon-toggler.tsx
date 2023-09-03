import { Box } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import DoDisturbAltOutlinedIcon from "@mui/icons-material/DoDisturbAltOutlined";

const DoneIconToggler = ({ task, onDoneTask, onNotDoneTask }) => {
  return !task?.isDone ? (
    <Box onClick={() => onDoneTask(task)}>
      {<CheckIcon sx={{ "&:hover": { transform: "scale(1.2)" } }} />}
    </Box>
  ) : (
    <Box onClick={() => onNotDoneTask(task)}>
      {
        <DoDisturbAltOutlinedIcon
          sx={{ "&:hover": { transform: "scale(1.2)" } }}
        />
      }
    </Box>
  );
};

export default DoneIconToggler;
