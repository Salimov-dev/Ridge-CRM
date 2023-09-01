import { Button } from "@mui/material";

const GoToButton = ({ text, color = "secondary", onClick }) => {
  return (
    <Button variant="text" color={color} onClick={onClick} >
      {text}
    </Button>
  );
};

export default GoToButton;
