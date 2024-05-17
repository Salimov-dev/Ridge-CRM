import { Box, styled } from "@mui/material";
import ButtonStyled from "@components/common/buttons/button-styled.button";
import { FC } from "react";

interface SuccessCancelFormButtonsProps {
  successTitle?: string;
  onSuccess: () => void;
  onCancel: () => void;
  onRemove?: () => void;
  disabledSuccess?: boolean;
  disabledRemoveButton?: boolean;
  isValidRemoveButton?: boolean;
}

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

const SuccessCancelFormButtons: FC<SuccessCancelFormButtonsProps> = ({
  successTitle = "Сохранить",
  onSuccess,
  onCancel,
  onRemove = () => {},
  disabledSuccess = false,
  disabledRemoveButton = false,
  isValidRemoveButton = false
}): JSX.Element => {
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
