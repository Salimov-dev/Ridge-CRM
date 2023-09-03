import { Button } from "@mui/material";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";

const PageBackButton = ({ onClick }) => {
  return (
    <Button
      color="success"
      variant="outlined"
      sx={{ height: "50px", color: "white" }}
      onClick={onClick}
    >
      <ArrowBackIosNewOutlinedIcon
        sx={{ width: "20px", height: "20px", marginRight: "5px" }}
      />
      Назад
    </Button>
  );
};

export default PageBackButton;
