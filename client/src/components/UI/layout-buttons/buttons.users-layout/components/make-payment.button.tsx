import styled from "@emotion/styled";
import { Button, Typography } from "@mui/material";
import AddCardOutlinedIcon from "@mui/icons-material/AddCardOutlined";

const ButtonStyled = styled(Button)`
  border: 1px solid white;
  color: white;
  display: flex;
  gap: 6px;
  background-color: blue;
`;

const MakePaymentButton = ({ onClick = () => {} }) => {
  return (
    <ButtonStyled
      onClick={onClick}
      variant="contained"
      sx={{ "&:hover": { background: "darkBlue" } }}
    >
      <AddCardOutlinedIcon sx={{ width: "30px", height: "30px" }} />
      <Typography variant="h5">ПОполнить баланс</Typography>
    </ButtonStyled>
  );
};

export default MakePaymentButton;
