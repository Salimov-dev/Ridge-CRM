import { Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const CloseButton = ({ onClose }) => {
  return (
    <Button
      color="success"
      sx={{ height: "50px", "&:hover": { color: "white" } }}
      onClick={onClose}
    >
      <CloseIcon sx={{ width: "30px", height: "30px", marginRight: "5px" }} />
    </Button>
  );
};

export default CloseButton;
