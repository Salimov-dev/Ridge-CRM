import { Typography } from "@mui/material";

const SelectedError = () => {
  return (
    <Typography
      variant="h4"
      sx={{
        background: "red",
        color: "white",
        margin: "10px 0",
        padding: "10px"
      }}
    >
      Вы не выбрали ни одного объекта для передачи
    </Typography>
  );
};

export default SelectedError;
