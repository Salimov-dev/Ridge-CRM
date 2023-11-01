import { Button, Typography } from "@mui/material";

const ChangePeriodButton = ({
  width = "100%",
  minWidth = "inherit",
  text,
  background,
  backgroundHover,
  color = "inherit",
  onClick = () => {},
}) => {
  return (
    <Button
      variant="outlined"
      color="success"
      sx={{
        height: '53px',
        width: width,
        minWidth: minWidth,
        color: color,
        background: background,
        borderColor: "inherit",
        "&:hover": { background: backgroundHover },
      }}
      onClick={onClick}
    >
      <Typography>{text}</Typography>
    </Button>
  );
};

export default ChangePeriodButton;
