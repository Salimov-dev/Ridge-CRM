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
  successTitle = "Сохранить",
  onSuccess,
  onCancel,
  onRemove = () => {},
  disabledSuccess = false,
  disabledRemoveButton = false,
  isValidRemoveButton = false
}) => {
  return (
    <ButtonsContainer>
      <ButtonStyled
        title={successTitle}
        style="SUCCESS"
        onClick={onSuccess}
        disabled={disabledSuccess}
      />
      <Container>
        {!disabledRemoveButton && (
          <ButtonStyled
            title="Удалить"
            style="DELETE"
            disabled={isValidRemoveButton}
            onClick={onRemove}
          />
        )}
        <ButtonStyled title="Отмена" style="CANCEL" onClick={onCancel} />
      </Container>
    </ButtonsContainer>
  );
};

export default SuccessCancelFormButtons;
