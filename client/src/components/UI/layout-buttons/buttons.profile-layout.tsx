import { Box } from "@mui/material";
import styled from "@emotion/styled";
// components
import ButtonStyled from "@components/common/buttons/button-styled.button";
// hooks
import useDialogHandlers from "@hooks/dialog/use-dialog-handlers";
// icons
import HttpsIcon from "@mui/icons-material/Https";

const ButtonsContainer = styled(Box)`
  display: flex;
  gap: 4px;
  margin-bottom: 30px;
`;

const ButtonsProfileLayout = ({ setState }) => {
  const { handleOpenUpdateProfilePage, handleOpenUpdatePasswordPage } =
    useDialogHandlers(setState);

  return (
    <ButtonsContainer>
      <ButtonStyled
        title="Редактировать профиль"
        style="MEETING"
        variant="contained"
        onClick={handleOpenUpdateProfilePage}
      />
      <ButtonStyled
        title="Изменить пароль"
        style="MY_TASK"
        icon={<HttpsIcon />}
        variant="contained"
        onClick={handleOpenUpdatePasswordPage}
      />
    </ButtonsContainer>
  );
};

export default ButtonsProfileLayout;
