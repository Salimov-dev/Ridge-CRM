import { Button, Typography, styled } from "@mui/material";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import { UseFormReset } from "react-hook-form";

type IInitialState = Record<string, string | string[] | null>;

interface IClearFilterButton {
  reset: UseFormReset<IInitialState>;
  initialState: IInitialState;
  disabled?: boolean;
  height?: string;
  width?: string;
  maxWidth?: string;
  margin?: string;
}

const ButtonStyled = styled(Button)`
  display: flex;
  align-items: center;
  gap: 3px;
`;

const ClearFilterButton = ({
  reset,
  initialState,
  disabled = false,
  height = "inherit",
  width = "220px",
  maxWidth = "270px",
  margin = "0"
}: IClearFilterButton): JSX.Element => {
  const handleClearForm = () => {
    reset(initialState);
  };

  return (
    <ButtonStyled
      sx={{ height, width, maxWidth, margin }}
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
