import { Button } from "@mui/material";

const CreateTaskButton = ({ onClick }) => {
  return (
    <Button variant="outlined" color="success" onClick={onClick}>
      Создать событие
    </Button>
  );
};

export default CreateTaskButton;
