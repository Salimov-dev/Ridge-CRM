import { Button } from "@mui/material";

const TableOpenButton = ({ text, color = "secondary", onClick }) => {
  return (
    <Button variant="text" color={color} onClick={onClick} >
      {text}
    </Button>
  );
};

export default TableOpenButton;
