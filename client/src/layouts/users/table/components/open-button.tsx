import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const OpenButton = ({ userId }) => {
  const navigate = useNavigate();
  return (
    <Button variant="text" color="secondary" onClick={() => navigate(`${userId}/edit`)}>
      Править
    </Button>
  );
};

export default OpenButton;
