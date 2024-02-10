import styled from "@emotion/styled";
import { Button, Typography } from "@mui/material";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";

const ButtonStyled = styled(Button)`
  border: 1px solid white;
  color: white;
  display: flex;
  gap: 6px;
`;

const AddTeammateButton = ({ onClick = () => {} }) => {
  return (
    <ButtonStyled onClick={onClick} color="success" variant="contained">
      <PersonAddAltOutlinedIcon sx={{ width: "30px", height: "30px" }} />
      <Typography variant="h5">Добавить участника</Typography>
    </ButtonStyled>
  );
};

export default AddTeammateButton;
