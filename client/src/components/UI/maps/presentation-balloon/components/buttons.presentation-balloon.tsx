import { useSelector } from "react-redux";
import { Box, styled } from "@mui/material";
import { Dispatch, SetStateAction } from "react";
// components
import ButtonStyled from "@components/common/buttons/button-styled.button";
// dialog-handlers
import presentationDialogsState from "@dialogs/dialog-handlers/presentation.dialog-handlers";
// hooks
import useDialogHandlers from "@hooks/dialog/use-dialog-handlers";
// interfaces
import { IDialogPagesState } from "@interfaces/state/dialog-pages-state.interface";
// store
import { getPresentationById } from "@store/presentation/presentations.store";

interface ButtonsPresentationBalloonProps {
  presentationId: string;
  setState: Dispatch<SetStateAction<IDialogPagesState>>;
}

const ButtonsContainer = styled(Box)`
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 4px;
  margin: 6px 0 0 0;
`;

const ButtonsPresentationBalloon = ({
  presentationId,
  setState
}: ButtonsPresentationBalloonProps) => {
  const presentation = useSelector(getPresentationById(presentationId));

  const objectId = presentation?.objectId;
  const { handleOpenObjectPage } = useDialogHandlers(setState);

  const { handleOpenUpdatePresentationPage } = presentationDialogsState({
    setState
  });

  return (
    <ButtonsContainer>
      <ButtonStyled
        title="Страница объекта"
        style="OBJECT"
        size="small"
        onClick={() => handleOpenObjectPage(objectId)}
      />
      <ButtonStyled
        title="Править презентацию"
        style="PRESENTATION"
        size="small"
        onClick={() => handleOpenUpdatePresentationPage(presentationId)}
      />
    </ButtonsContainer>
  );
};

export default ButtonsPresentationBalloon;
