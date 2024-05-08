import { Dispatch, FC, SetStateAction } from "react";
// components
import DialogStyled from "@components/common/dialog/dialog-styled";
import CreatePresentation from "@components/pages/presentation/create-presentation/create-presentation.page";
import UpdatePresentation from "@components/pages/presentation/update-presentation/update-presentation.page";
// dialogs
import presentationDialogsState from "@dialogs/dialog-handlers/presentation.dialog-handlers";
// interfaces
import { IDialogPagesState } from "@interfaces/state/dialog-pages-state.interface";

interface PresentationDialogPagesProps {
  state: IDialogPagesState;
  setState: Dispatch<SetStateAction<IDialogPagesState>>;
  isObjectPage: boolean;
}

const PresentationDialogPages: FC<PresentationDialogPagesProps> = ({
  state,
  setState,
  isObjectPage
}) => {
  const {
    handleCloseCreatePresentationPage,
    handleCloseUpdatePresentationPage
  } = presentationDialogsState({ setState });

  return (
    <>
      <DialogStyled
        component={
          <CreatePresentation
            onClose={handleCloseCreatePresentationPage}
            objectId={state.objectId}
            isObjectPage={isObjectPage}
          />
        }
        onClose={handleCloseCreatePresentationPage}
        maxWidth="sm"
        open={state.createPresentationPage}
      />
      <DialogStyled
        component={
          <UpdatePresentation
            onClose={handleCloseUpdatePresentationPage}
            presentationId={state.presentationId}
          />
        }
        onClose={handleCloseUpdatePresentationPage}
        maxWidth="sm"
        open={state.updatePresentationPage}
      />
    </>
  );
};

export default PresentationDialogPages;
