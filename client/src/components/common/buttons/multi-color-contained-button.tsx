import { Button } from "@mui/material";

const MultiColorContainedButton = ({
  text = "",
  fontColor = "white",
  background = "inherit",
  backgroudHover = "inherit",
  fontColorHover = "white",
  onClick = () => {},
  width = "100%",
  disabled = false,
}) => {
  return (
    <Button
      variant="text"
      onClick={onClick}
      disabled={disabled}
      sx={{
        width: width,
        background: background,
        color: fontColor,
        "&:hover": { color: fontColorHover, background: backgroudHover },
      }}
    >
      {text}
    </Button>
  );
};

export default MultiColorContainedButton;
