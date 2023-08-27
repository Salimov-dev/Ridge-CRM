import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Item = ({ path, title }) => {
  const navigate = useNavigate();

  return (
    <Button
      variant="outlined"
      sx={{
        color: "gray",
        "&:hover": {
          color: "white",
        },
      }}
      onClick={() => navigate(path)}
    >
      {title}
    </Button>
  );
};

export default Item;
