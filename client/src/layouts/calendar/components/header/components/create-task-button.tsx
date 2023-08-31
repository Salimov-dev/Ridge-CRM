import { Button } from "@mui/material";

const CreateTaskButton = ({ onClick, title, background, color, isMyTask=false }) => {
  return (
    <Button
      variant="contained"
      onClick={onClick}
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
