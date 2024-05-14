import { Dispatch, FC, SetStateAction } from "react";
import { IDialogPagesState } from "@interfaces/state/dialog-pages-state.interface";
import ButtonStyled from "@components/common/buttons/button-styled.button";
import objectsDialogsState from "@dialogs/dialog-handlers/objects.dialog-handlers";

interface ButtonsObjectBalloonProps {
  objectId: string;
  setState: Dispatch<SetStateAction<IDialogPagesState>>;
}

const ButtonsObjectBalloon: FC<ButtonsObjectBalloonProps> = ({
  objectId,
  setState
}): JSX.Element => {
  const { handleOpenObjectPage } = objectsDialogsState({ setState });
  return (
    <>
      <ButtonStyled
        title="Открыть страницу объекта"
        style="OBJECT"
        width="100%"
        size="small"
        onClick={() => handleOpenObjectPage(objectId)}
      />
    </>
  );
};

export default ButtonsObjectBalloon;
