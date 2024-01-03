import DialogStyled from "@components/common/dialog/dialog-styled";
import ObjectPage from "@components/pages/object-page/object-page";
import useObject from "../hooks/use-objects.hook";
import CreateObject from "@components/pages/create-object/create-object";
import UpdateObject from "@components/pages/update-object/update-object";
import CreatePresentation from "@components/pages/create-presentation/create-presentation";
import TransferObjectToAnotherManager from "@components/pages/transfer-object-to-another-manager/transfer-object-to-another-manager";

const Dialogs = ({ state, setState, selectedObjects, setRowSelection }) => {
  const {
    handleCloseCreateObjectPage,
    handleOpenUpdateObjectPage,
    handleCloseUpdateObjectPage,
    handleCloseObjectPage,
    handleOpenCreatePresentationPage,
    handleCloseCreatePresentationPage,
    handleCloseTransferObjectPage,
  } = useObject(setState);

  return (
    <>
      <DialogStyled
        component={
          <ObjectPage
            onClose={handleCloseObjectPage}
            onEdit={handleOpenUpdateObjectPage}
            onOpenCreatePresentationPage={handleOpenCreatePresentationPage}
            objectId={state.objectId}
          />
        }
        onClose={handleCloseObjectPage}
        open={state.objectPage}
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
        component={
          <CreatePresentation onClose={handleCloseCreatePresentationPage} />
        }
        onClose={handleCloseUpdateObjectPage}
        maxWidth="sm"
        open={state.presentationPage}
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

export default Dialogs;
