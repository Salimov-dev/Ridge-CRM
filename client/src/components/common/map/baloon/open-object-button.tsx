import { Button } from "@mui/material";

const OpenObjectButton = ({ onClick }) => {
  return (
    <Button
        variant="outlined"
        size="small"
        color="primary"
        onClick={onClick}
        sx={{ paddingTop: "6px", marginBottom: "6px" }}
      >
        Открыть страницу объекта
      </Button>
  );
};

export default OpenObjectButton;
