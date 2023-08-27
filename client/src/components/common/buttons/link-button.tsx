import { Button } from "@mui/material";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import { useNavigate } from "react-router-dom";

const LinkButton = ({ path, text="Назад" }) => {
  const navigate = useNavigate();
  return (
    <Button
      color="success"
      variant="outlined"
      sx={{ height: "50px", color: "white" }}
      onClick={() => navigate(path)}
    >
      <ArrowBackIosNewOutlinedIcon
        sx={{ width: "20px", height: "20px", marginRight: "5px" }}
      />
      {text}
    </Button>
  );
};

export default LinkButton;
