import { Button } from "@mui/material";

const TableOpenButton = ({
  text,
  background,
  color = "secondary",
  onClick,
  disabled,
  fontColor,
  backgroudHover
}) => {
  return (
    <Button
      variant="text"
      color={color}
      onClick={onClick}
      disabled={disabled}
      sx={{
        width: "100%",
        background: background,
        color: fontColor,
        "&:hover": { background: backgroudHover },
      }}
    >
      {text}
    </Button>
  );
};

export default TableOpenButton;
