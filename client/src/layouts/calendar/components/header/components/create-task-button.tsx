import { Button } from "@mui/material";

const CreateTaskButton = ({ onClick, title, color }) => {
  return (
    <Button variant="outlined" color={color} onClick={onClick}>
      {title}
    </Button>
  );
};

export default CreateTaskButton;
