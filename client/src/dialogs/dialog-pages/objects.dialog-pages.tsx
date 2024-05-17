import { Dispatch, FC, SetStateAction } from "react";
// components
import DialogStyled from "@components/common/dialog/dialog-styled";
import ObjectPage from "@components/pages/object-page/object-page";
import CreateObject from "@components/pages/object/create-object/create-object.page";
import UpdateObject from "@components/pages/object/update-object.page";
import TransferObjectToAnotherManager from "@components/pages/transfer-object-to-another-manager/transfer-object-to-another-manager.page.page";
// dialogs
import objectsDialogsState from "@dialogs/dialog-handlers/objects.dialog-handlers";
// interfaces
import { IDialogPagesState } from "@interfaces/state/dialog-pages-state.interface";
import { RowSelection } from "@interfaces/table/row-selection.type";

interface ObjectsDialogPagesProps {
  state: IDialogPagesState;
  setState: Dispatch<SetStateAction<IDialogPagesState>>;
  selectedObjects?: string[];
  setRowSelection?: Dispatch<SetStateAction<RowSelection>>;
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
    handleCloseUpdateObjectPage,
    handleCloseTransferObjectPage
  } = objectsDialogsState({ setState });

  return (
    <>
      <DialogStyled
        component={<ObjectPage state={state} setState={setState} />}
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
          <UpdateObject state={state} onClose={handleCloseUpdateObjectPage} />
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
