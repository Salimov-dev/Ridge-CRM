import { Dispatch, FC, SetStateAction } from "react";
// components
import DialogStyled from "@components/common/dialog/dialog-styled";
import CreateMeeting from "@components/pages/meeting/create-meeting.page";
import UpdateMeeting from "@components/pages/meeting/update-meeting.page";
// dialogs;
import meetingsDialogsState from "@dialogs/dialog-handlers/meetings.dialog-handlers";
// interfaces
import { IDialogPagesState } from "@interfaces/state/dialog-pages-state.interface";
import ObjectPage from "@components/pages/object-page/object-page";
import CreateObject from "@components/pages/object/create-object/create-object.page";
import UpdateObject from "@components/pages/object/update-object.page";
import TransferObjectToAnotherManager from "@components/pages/transfer-object-to-another-manager/transfer-object-to-another-manager.page.page";
import objectsDialogsState from "@dialogs/dialog-handlers/objects.dialog-handlers";
import presentationsDialogsState from "@dialogs/dialog-handlers/presentations.dialog-handlers";

interface ObjectsDialogPagesProps {
  state: IDialogPagesState;
  setState: Dispatch<SetStateAction<IDialogPagesState>>;
  selectedObjects?: string[];
  setRowSelection?: () => void;
}

const ObjectsDialogPages: FC<ObjectsDialogPagesProps> = ({
  state,
  setState,
  selectedObjects,
  setRowSelection
}) => {
  const {
    handleCloseCreateObjectPage,
    handleCloseObjectPage,
    handleOpenUpdateObjectPage,
    handleCloseUpdateObjectPage,
    handleCloseTransferObjectPage
  } = objectsDialogsState({ setState });

  const { handleOpenCreatePresentationPage } = presentationsDialogsState({
    setState
  });

  return (
    <>
      <DialogStyled
        component={
          <ObjectPage
            onClose={handleCloseObjectPage}
            onOpenUpdateObjectPage={handleOpenUpdateObjectPage}
            onOpenCreatePresentationPage={handleOpenCreatePresentationPage}
            objectId={state.objectId}
            setState={setState}
          />
        }
        onClose={handleCloseObjectPage}
        open={state.objectPage}
        maxWidth="xl"
      />
      <DialogStyled
        component={<CreateObject onClose={handleCloseCreateObjectPage} />}
        onClose={handleCloseCreateObjectPage}
        open={state.createPage}
      />
      <DialogStyled
        component={
          <UpdateObject
            onClose={handleCloseUpdateObjectPage}
            objectId={state.objectId}
          />
        }
        onClose={handleCloseUpdateObjectPage}
        open={state.updatePage}
      />

      <DialogStyled
        onClose={handleCloseTransferObjectPage}
        open={state.transferObjectPage}
        maxWidth="sm"
        component={
          <TransferObjectToAnotherManager
            title="Передать объекты"
            objectsToTransfer={selectedObjects}
            onClose={handleCloseTransferObjectPage}
            setRowSelection={setRowSelection}
          />
        }
      />
    </>
  );
};

export default ObjectsDialogPages;
