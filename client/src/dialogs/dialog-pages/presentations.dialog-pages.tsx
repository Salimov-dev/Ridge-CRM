import { Dispatch, FC, SetStateAction } from "react";
// components
import DialogStyled from "@components/common/dialog/dialog-styled";
import CreatePresentation from "@components/pages/presentation/create-presentation/create-presentation.page";
import UpdatePresentation from "@components/pages/presentation/update-presentation/update-presentation.page";
// dialogs
import presentationDialogsState from "@dialogs/dialog-handlers/presentations.dialog-handlers";
// interfaces
import { IDialogPagesState } from "@interfaces/state/dialog-pages-state.interface";

interface PresentationsDialogPagesProps {
  state: IDialogPagesState;
  setState: Dispatch<SetStateAction<IDialogPagesState>>;
}

const PresentationsDialogPages: FC<PresentationsDialogPagesProps> = ({
  state,
  setState
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
            isObjectPage={!state?.objectId}
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

export default PresentationsDialogPages;
