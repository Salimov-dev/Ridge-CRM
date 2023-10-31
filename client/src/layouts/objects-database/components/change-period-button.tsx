import { Box, Button, Typography } from "@mui/material";

const ChangePeriodButton = ({
  periodName,
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
        width: width,
        minWidth: minWidth,
        color: color,
        background: background,
        borderColor: "inherit",
        "&:hover": { background: backgroundHover },
      }}
      onClick={()=>onClick(periodName)}
    >
      <Typography>{text}</Typography>
    </Button>
  );
};

export default ChangePeriodButton;
