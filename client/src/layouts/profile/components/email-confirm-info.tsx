import styled from "@emotion/styled";
import { Typography, Box } from "@mui/material";
// components
import ButtonStyled from "@components/common/buttons/button-styled.button";
// icons
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";

const Container = styled(Box)`
  display: flex;
  align-items: center;
  gap: 4px;
  margin: 0 0 10px 0;
`;

const EmailConfirmInfo = ({ user }) => {
  const isUserActivated = user?.isEmailActivated;
  return isUserActivated ? (
    <Container>
      <CheckCircleOutlineOutlinedIcon
        sx={{ width: "30px", height: "30px", color: "green" }}
      />
      <Typography variant="h4">Почта подтверждена</Typography>
    </Container>
  ) : (
    <Container>
      <CancelOutlinedIcon
        sx={{ width: "30px", height: "30px", color: "red" }}
      />
      <Typography variant="h4">Почта не подтверждена</Typography>
      <ButtonStyled
        title="Подтвердить"
        style="MANAGER_TASK"
        variant="contained"
        // onClick={handleOpenUpdateProfilePage}
      />
    </Container>
  );
};

export default EmailConfirmInfo;
