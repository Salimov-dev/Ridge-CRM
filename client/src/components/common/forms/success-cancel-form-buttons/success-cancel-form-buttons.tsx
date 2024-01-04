import { Box, styled } from "@mui/material";
import ButtonStyled from "@components/common/buttons/button-styled.button";

const ButtonsContainer = styled(Box)`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
`;

const Container = styled(Box)`
  display: flex;
  gap: 4px;
`;

const SuccessCancelFormButtons = ({
  onSuccess,
  onCancel,
  onRemove = () => {},
  isUpdate = false,
}) => {
  return (
    <ButtonsContainer>
      <ButtonStyled title="Сохранить" style="SUCCESS" onClick={onSuccess} />
      <Container>
        {isUpdate && (
          <ButtonStyled title="Удалить" style="DELETE" onClick={onRemove} />
        )}
        <ButtonStyled title="Отмена" style="CANCEL" onClick={onCancel} />
      </Container>
    </ButtonsContainer>
  );
};

export default SuccessCancelFormButtons;
