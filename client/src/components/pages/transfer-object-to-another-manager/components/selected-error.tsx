import { Typography } from "@mui/material";

const SelectedError = () => {
  return (
    <Typography
      variant="h4"
      sx={{ background: "red", color: "white", marginBottom: "20px" }}
    >
      Вы не выбрали ни одного объекта для передачи
    </Typography>
  );
};

export default SelectedError;
