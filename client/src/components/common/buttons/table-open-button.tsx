import { Button } from "@mui/material";

const TableOpenButton = ({
  text,
  background,
  onClick,
  disabled,
  fontColor,
  backgroudHover,
  fontColorHover = "white",
}) => {
  return (
    <Button
      variant="text"
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

export default TableOpenButton;
