import { Button } from "@mui/material";

const PositiveOutlinedButton = ({
  title = "",
  onClick = () => {},
  isValid = false,
  type = "button",
  background= "DarkGreen"
}: {
  title?: string;
  onClick?: () => void;
  isValid?: boolean;
  type?: "button" | "submit" | "reset";
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
          background: background,
          borderColor: "MediumSeaGreen",
        },
      }}
    >
      {title}
    </Button>
  );
};

export default PositiveOutlinedButton;
