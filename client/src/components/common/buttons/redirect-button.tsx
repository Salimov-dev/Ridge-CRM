import { Button } from "@mui/material";

const RedirectButton = ({ text, color = "secondary", onClick }) => {
  return (
    <Button variant="text" color={color} onClick={onClick}>
      {text}
    </Button>
  );
};

export default RedirectButton;
