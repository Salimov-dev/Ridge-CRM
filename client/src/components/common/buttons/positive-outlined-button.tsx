import { Button } from "@mui/material";

const PositiveOutlinedButton = ({
  title = "",
  onClick = () => {},
  isValid = false,
  type = "button",
}) => {
  return (
    <Button
      variant="outlined"
      type={type}
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
