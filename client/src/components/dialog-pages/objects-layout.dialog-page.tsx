import DialogStyled from "@components/common/dialog/dialog-styled";
import ObjectPage from "@components/pages/object-page/object-page";
import CreateObject from "@components/pages/object/create-object/create-object";
import UpdateObject from "@components/pages/object/update-object";
import CreatePresentation from "@components/pages/presentation/create-presentation";
import TransferObjectToAnotherManager from "@components/pages/transfer-object-to-another-manager/transfer-object-to-another-manager";
import VideoPlayerPage from "@components/pages/video-player/video-player.page";
import useDialogHandlers from "@hooks/dialog/use-dialog-handlers";

const ObjectsLayoutDialogPage = ({
  state,
  setState,
  selectedObjects,
  setRowSelection,
  isObjectPage
}) => {
  const {
    handleCloseCreateObjectPage,
    handleOpenUpdateObjectPage,
    handleCloseUpdateObjectPage,
    handleCloseObjectPage,
    handleOpenCreatePresentationPage,
    handleCloseCreatePresentationPage,
    handleCloseTransferObjectPage,
    handleCloseVideoPlayerPage
  } = useDialogHandlers(setState);

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
      <DialogStyled
        component={
          <VideoPlayerPage
            onClose={handleCloseVideoPlayerPage}
            videoTitle="Как пользоваться Таблицей объектов"
            videoSrc="https://www.youtube.com/embed/i7INzzNfG1o"
          />
        }
        onClose={handleCloseVideoPlayerPage}
        maxWidth="lg"
        open={state.videoPlayerPage}
      />
    </>
  );
};

export default ObjectsLayoutDialogPage;
