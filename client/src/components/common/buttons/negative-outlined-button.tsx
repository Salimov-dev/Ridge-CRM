import { Button } from "@mui/material";

const NegativeOutlinedButton = ({ title, onClick }) => {
  return (
    <Button
      type="button"
      variant="outlined"
      color="error"
      onClick={onClick}
      sx={{
        color: "lightCoral",
        borderColor: "indianRed",
        "&:hover": { color: "white", background: "fireBrick" },
      }}
    >
      {title}
    </Button>
  );
};

export default NegativeOutlinedButton;
