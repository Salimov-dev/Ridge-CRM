import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const OpenObjectButton = ({ path }) => {
  const navigate = useNavigate();
  return (
    <Button
      variant="outlined"
      size="small"
      color="primary"
      onClick={() => navigate(path)}
      sx={{ paddingTop: "6px", marginBottom: "6px" }}
    >
      Перейти в объект
    </Button>
  );
};

export default OpenObjectButton;
