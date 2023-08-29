import { Box, styled, Button, Typography } from "@mui/material";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";

const Component = styled(Box)`
  display: flex;
  margin-bottom: 10px;
  gap: 4px;
`;

const AddAndClearFiltersButton = ({ title, isInputEmpty, reset, initialState, disabled, onOpen }) => {

  return (
    <Component>
      <Button
        variant="contained"
        color="success"
        onClick={onOpen}
        disabled={disabled}
      >
        <Typography>{title}</Typography>
      </Button>

      {isInputEmpty && (
        <Button
          variant="outlined"
          color="success"
          onClick={() => reset(initialState)}
          sx={{ display: "flex", alignItems: "center", gap: "3px" }}
        >
          <Typography>Очистить фильтры</Typography>
          <ClearOutlinedIcon />
        </Button>
      )}
    </Component>
  );
};

export default AddAndClearFiltersButton;
