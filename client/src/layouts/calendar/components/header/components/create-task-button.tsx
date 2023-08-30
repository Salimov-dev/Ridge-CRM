import { Button } from "@mui/material";

const CreateTaskButton = ({ onClick }) => {
  return (
    <Button variant="outlined" color="success" onClick={onClick}>
      Поставить себе задачу
    </Button>
  );
};

export default CreateTaskButton;
