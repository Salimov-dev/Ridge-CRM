import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const OpenButton = ({ objectId }) => {
  const navigate = useNavigate();
  return (
    <Button variant="text" color="secondary" onClick={() => navigate(objectId)}>
      Открыть
    </Button>
  );
};

export default OpenButton;
