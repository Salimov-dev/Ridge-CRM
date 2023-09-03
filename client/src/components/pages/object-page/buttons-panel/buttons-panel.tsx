import { Box, Button, styled } from "@mui/material";

const Component = styled(Box)`
  display: flex;
  gap: 4px;
`;

const ButtonsPanel = ({ onClose, onEdit }) => {
  return (
    <Component>
      <Box sx={{ display: "flex", gap: "4px" }}>
        <Button
          color="secondary"
          variant="contained"
          onClick={onEdit}
          sx={{ height: "40px" }}
        >
          Править
        </Button>
        <Button
          color="error"
          variant="contained"
          onClick={onClose}
          sx={{ height: "40px" }}
        >
          Закрыть
        </Button>
      </Box>
    </Component>
  );
};

export default ButtonsPanel;
