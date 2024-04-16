import { Button, Typography } from "@mui/material";

const ChangePeriodButtonObjectsDatabase = ({
  width = "100%",
  text,
  period,
  selectedPeriod,
  color = "inherit",
  onClick
}) => {
  return (
    <Button
      variant="outlined"
      color="success"
      sx={{
        width: width,
        color: color,
        border:
          period === selectedPeriod ? "2px solid yellow" : "1px solid green"
      }}
      onClick={onClick}
    >
      <Typography>{text}</Typography>
    </Button>
  );
};

export default ChangePeriodButtonObjectsDatabase;
