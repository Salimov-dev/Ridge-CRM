import { Button, Typography } from "@mui/material";

const ChangePeriodButton = ({
  width = "100%",
  text,
  color = "inherit",
  border= "inherit",
  onClick = () => {},
}) => {
  return (
    <Button
      variant="outlined"
      color="success"
      sx={{
        width: width,
        color: color,
        border: border
      }}
      onClick={onClick}
    >
      <Typography>{text}</Typography>
    </Button>
  );
};

export default ChangePeriodButton;
