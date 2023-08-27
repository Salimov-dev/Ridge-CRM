import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const EditButton = ({ path }) => {
  const navigate = useNavigate();

  return (
    <Button
      color="secondary"
      variant="contained"
      sx={{ height: "50px" }}
      onClick={() => navigate(path)}
    >
      Править
    </Button>
  );
};

export default EditButton;
