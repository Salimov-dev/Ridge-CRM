import { Button } from "@mui/material";

const OpenRidgeObjectButton = ({
  text,
  background,
  onClick,
  disabled,
  fontColor="inherit",
  backgroudHover,
  fontColorHover = "white",
}) => {
  return (
    <Button
      variant="text"
      size="small"
      onClick={onClick}
      disabled={disabled}
      sx={{
        width: "100%",
        background: background,
        color: fontColor,
        "&:hover": { color: fontColorHover, background: backgroudHover },
      }}
    >
      {text}
    </Button>
  );
};

export default OpenRidgeObjectButton;
