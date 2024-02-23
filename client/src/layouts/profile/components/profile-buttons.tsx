import ButtonStyled from "@components/common/buttons/button-styled.button";
import styled from "@emotion/styled";
import useDialogHandlers from "@hooks/dialog/use-dialog-handlers";
import { Box } from "@mui/material";
import HttpsIcon from "@mui/icons-material/Https";

const ButtonsContainer = styled(Box)`
  display: flex;
  gap: 4px;
  margin-bottom: 10px;
`;

const ProfileButtons = ({ setState }) => {
  const { handleOpenUpdateProfilePage, handleOpenUpdatePasswordPage } =
    useDialogHandlers(setState);

  return (
    <ButtonsContainer>
      <ButtonStyled
        title="Редактировать"
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

export default ProfileButtons;
