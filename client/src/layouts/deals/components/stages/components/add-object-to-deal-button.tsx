import { Button } from "@mui/material";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";

const CreateDealButton = ({ item, onOpen }) => {
  return (
    <Button
      sx={{
        display: "flex",
        gap: "4px",
        alignItems: "center",
        color: "gray",
        "&:hover": {
          color: "white",
        },
      }}
      onClick={() => onOpen(item?._id)}
    >
      <AddBoxOutlinedIcon /> Добавить объект
    </Button>
  );
};

export default CreateDealButton;
