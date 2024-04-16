import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCurrrentPathState } from "@store/current-path/current-path.store";

const ItemFooter = ({ path, title }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <Button
      variant="outlined"
      sx={{
        color: "gray",
        "&:hover": {
          color: "white"
        }
      }}
      onClick={() => {
        navigate(path);
        dispatch<any>(setCurrrentPathState(window.location.pathname));
      }}
    >
      {title}
    </Button>
  );
};

export default ItemFooter;
