import { Button } from "@mui/material";

const MultiColorOutlinedButton = ({
  text,
  fontColor,
  borderColor,
  backgroundHover,
  fontColorHover = "white",
  onClick,
  width="100%",
  disabled=false,
}) => {
  return (
    <Button
      variant="text"
      onClick={onClick}
      disabled={disabled}
      sx={{
        width: width,
        border: `1px solid ${borderColor}`,
        color: fontColor,
        "&:hover": { color: fontColorHover, backgroundColor: backgroundHover },
      }}
    >
      {text}
    </Button>
  );
};

export default MultiColorOutlinedButton;
