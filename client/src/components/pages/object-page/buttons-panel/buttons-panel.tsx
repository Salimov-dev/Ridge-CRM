import { Box, Button, styled } from "@mui/material";

const Component = styled(Box)`
  display: flex;
  gap: 4px;
`;

const ButtonsPanel = ({ onClose }) => {
  return (
    <Component>
      <Box sx={{ display: "flex", gap: "4px" }}>
        <Button color="secondary" variant="contained" sx={{ height: "40px" }}>
          Править
        </Button>
        <Button
          color="error"
          variant="contained"
          sx={{ height: "40px" }}
          onClick={onClose}
        >
          Закрыть
        </Button>
      </Box>
    </Component>
  );
};

export default ButtonsPanel;
