import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const TableOpenButton = ({ id, text, color = "secondary", nav }) => {
  const navigate = useNavigate();

  return (
    <Button variant="text" color={color} onClick={() => navigate(nav)}>
      {text}
    </Button>
  );
};

export default TableOpenButton;
