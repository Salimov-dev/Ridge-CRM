import { Button, Typography } from "@mui/material";

const ChangePeriodButton = ({
  width = "100%",
  text,
  period,
  selectedPeriod,
  color = "inherit",
  onChangePeriod
}) => {
  return (
    <Button
      variant="outlined"
      color="success"
      sx={{
        width: width,
        color: color,
        border: period === selectedPeriod ? "2px solid yellow" : "1px solid green",
      }}
      onClick={() => onChangePeriod(selectedPeriod)}
    >
      <Typography>{text}</Typography>
    </Button>
  );
};

export default ChangePeriodButton;
