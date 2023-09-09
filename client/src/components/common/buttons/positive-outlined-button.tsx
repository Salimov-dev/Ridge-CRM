import { Button } from "@mui/material";

const PositiveOutlinedButton = ({ title, onClick, isValid = false }) => {
  return (
    <Button
      type="button"
      variant="outlined"
      onClick={onClick}
      disabled={isValid}
      sx={{
        color: "MediumSeaGreen",
        borderColor: "MediumSeaGreen",
        "&:hover": {
          color: "white",
          background: "DarkGreen",
          borderColor: "MediumSeaGreen",
        },
      }}
    >
      {title}
    </Button>
  );
};

export default PositiveOutlinedButton;
