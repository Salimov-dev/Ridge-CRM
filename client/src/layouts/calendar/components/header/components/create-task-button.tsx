import { Button } from "@mui/material";

const CreateTaskButton = ({ onClick, title, background, color, isMyTask=false, disabled }) => {
  return (
    <Button
      variant="contained"
      onClick={onClick}
      disabled={disabled}
      sx={{
        background: background,
        color: color,
        "&:hover": { background: isMyTask ? "darkOrange" : "darkRed" },
      }}
    >
      {title}
    </Button>
  );
};

export default CreateTaskButton;