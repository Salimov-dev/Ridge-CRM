import { Typography, Box } from "@mui/material";
// components
import ButtonStyled from "@components/common/buttons/button-styled.button";
// icons
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";

const EmailConfirmInfo = ({ user }) => {
  const isUserActivated = user?.isActive;
  return isUserActivated ? (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: "4px",
        margin: "10px 0",
      }}
    >
      <CheckCircleOutlineOutlinedIcon
        sx={{ width: "30px", height: "30px", color: "green" }}
      />
      <Typography variant="h4">Почта подтверждена</Typography>
    </Box>
  ) : (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: "4px",
        margin: "10px 0",
      }}
    >
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
    </Box>
  );
};

export default EmailConfirmInfo;
