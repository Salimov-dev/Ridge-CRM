import { Box } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import DoDisturbAltOutlinedIcon from "@mui/icons-material/DoDisturbAltOutlined";

const DoneIconToggler = ({ item, onDoneItem, onNotDoneItem }) => {
  const itemIsDone = item?.isDone

  return !itemIsDone ? (
    <Box onClick={() => onDoneItem(item)}>
      {
        <CheckIcon
          sx={{
            opacity: "0.5",
            "&:hover": { opacity: "1", transform: "scale(1.2)" },
          }}
        />
      }
    </Box>
  ) : (
    <Box onClick={() => onNotDoneItem(item)}>
      {
        <DoDisturbAltOutlinedIcon
          sx={{
            opacity: "0.5",
            "&:hover": { opacity: "1", transform: "scale(1.2)" },
          }}
        />
      }
    </Box>
  );
};

export default DoneIconToggler;
