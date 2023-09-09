import { Box, styled, Button, Typography } from "@mui/material";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";

const ButtonStyled = styled(Button)`
  display: flex;
  align-items: center;
  gap: 3px;
`;

const AddAndClearFiltersButton = ({
  initialState,
  isInputEmpty,
  reset,
  reverse = false,
  button,
}) => {
  const Component = styled(Box)`
    display: flex;
    flex-direction: ${reverse ? "row-reverse" : "row"};
    margin-bottom: 10px;
    gap: 4px;
  `;

  const handleClearForm = () => {
    reset(initialState);
  };

  return (
    <Component>
      {button}
      {isInputEmpty && (
        <ButtonStyled
          variant="outlined"
          color="success"
          onClick={handleClearForm}
        >
          <Typography>Очистить фильтры</Typography>
          <ClearOutlinedIcon />
        </ButtonStyled>
      )}
    </Component>
  );
};

export default AddAndClearFiltersButton;
