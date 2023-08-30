import { Box, Button } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const ControlButtons = ({ onPrev, onNext, onToday }) => {
  return (
    <Box sx={{ display: "flex", gap: "4px" }}>
      <Button variant="outlined" color="success" onClick={onPrev}>
        <ArrowBackIosIcon />
      </Button>
      <Button variant="outlined" color="success" onClick={onToday}>
        Сегодня
      </Button>
      <Button variant="outlined" color="success" onClick={onNext}>
        <ArrowForwardIosIcon />
      </Button>
    </Box>
  );
};

export default ControlButtons;
