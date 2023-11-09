import { Button, Typography, styled } from "@mui/material";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";

const ButtonStyled = styled(Button)`
  display: flex;
  align-items: center;
  gap: 3px;
`;

const ClearFilterButton = ({
  reset,
  initialState,
  disabled = false,
  height="inherit",
  width = "220px",
  maxWidth = "270px",
  margin = "0",
}) => {
  const handleClearForm = () => {
    reset(initialState);
  };

  return (
    <ButtonStyled
      sx={{ height: height, width: width, maxWidth: maxWidth, margin: margin }}
      variant="outlined"
      color="success"
      onClick={handleClearForm}
      disabled={disabled}
    >
      <Typography>Очистить фильтры</Typography>
      <ClearOutlinedIcon />
    </ButtonStyled>
  );
};

export default ClearFilterButton;
