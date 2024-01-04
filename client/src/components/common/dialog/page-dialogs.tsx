import DialogStyled from "@components/common/dialog/dialog-styled";
import ObjectPage from "@components/pages/object-page/object-page";
import useObject from "../../../hooks/object/use-objects-handlers";
import CreateObject from "@components/pages/create-object/create-object";
import UpdateObject from "@components/pages/update-object/update-object";
import CreatePresentation from "@components/pages/create-presentation/create-presentation";
import TransferObjectToAnotherManager from "@components/pages/transfer-object-to-another-manager/transfer-object-to-another-manager";
import UpdateMeeting from "@components/pages/update-meeting/update-meeting";
import CreateMeeting from "@components/pages/create-meeting/create-meeting";
import UpdateLastContact from "@components/pages/update-last-contact/update-last-contact";
import CreateLastContact from "@components/pages/create-last-contact/create-last-contact";
import UpdateManagerTask from "@components/pages/update-manager-task/update-manager-task";
import CreateManagerTask from "@components/pages/create-manager-task/create-manager-task";
import UpdateMyTask from "@components/pages/update-my-task/update-my-task";
import CreateMyTask from "@components/pages/create-my-task/create-my-task";

const PageDialogs = ({
  state,
  setState,
  objects = [],
  users = [],
  selectedObjects = [],
  setRowSelection = () => {},
}) => {
  const {
    handleCloseCreateObjectPage,
    handleOpenUpdateObjectPage,
    handleCloseUpdateObjectPage,
    handleCloseObjectPage,
    handleOpenCreatePresentationPage,
    handleCloseCreatePresentationPage,
    handleCloseTransferObjectPage,
    handleCloseCreateMyTaskPage,
    handleCloseUpdateMyTaskPage,
    handleCloseCreateManagerTaskPage,
    handleCloseUpdateManagerTaskPage,
    handleCloseCreateLastContactPage,
    handleCloseUpdateLastContactPage,
    handleCloseCreateMeetingPage,
    handleCloseUpdateMeetingPage,
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
      <DialogStyled
        component={
          <CreateMyTask
            title="Добавить себе задачу"
            objectPageId={state.objectId}
            isObjectPage={state.createMyTaskPage}
            objects={objects}
            dateCreate={state.dateCreate}
            onClose={handleCloseCreateMyTaskPage}
          />
        }
        maxWidth="sm"
        onClose={handleCloseCreateMyTaskPage}
        open={state.createMyTaskPage}
      />
      <DialogStyled
        onClose={handleCloseUpdateMyTaskPage}
        open={state.updateMyTaskPage}
        maxWidth="sm"
        component={
          <UpdateMyTask
            title="Изменить свою задачу"
            taskId={state.taskId}
            objectId={state.objectId}
            onClose={handleCloseUpdateMyTaskPage}
          />
        }
      />
      <DialogStyled
        onClose={handleCloseCreateManagerTaskPage}
        open={state.createManagerTaskPage}
        maxWidth="sm"
        component={
          <CreateManagerTask
            title="Поставить менеджеру задачу"
            objectPageId={state.objectId}
            dateCreate={state.dateCreate}
            users={users}
            onClose={handleCloseCreateManagerTaskPage}
          />
        }
      />
      <DialogStyled
        onClose={handleCloseUpdateManagerTaskPage}
        open={state.updateManagerTaskPage}
        maxWidth="sm"
        component={
          <UpdateManagerTask
            title="Изменить задачу менеджеру"
            objects={objects}
            users={users}
            taskId={state.taskId}
            onClose={handleCloseUpdateManagerTaskPage}
          />
        }
      />
      <DialogStyled
        component={
          <CreateLastContact
            objectPageId={state.objectId}
            onClose={handleCloseCreateLastContactPage}
          />
        }
        onClose={handleCloseCreateLastContactPage}
        open={state.createLastContactPage}
        maxWidth="sm"
      />
      <DialogStyled
        component={
          <UpdateLastContact
            lastContactId={state.lastContactId}
            onClose={handleCloseUpdateLastContactPage}
          />
        }
        onClose={handleCloseUpdateLastContactPage}
        open={state.updateLastContactPage}
        maxWidth="sm"
      />
      <DialogStyled
        component={
          <CreateMeeting
            onClose={handleCloseCreateMeetingPage}
            objectPageId={state.objectId}
            dateCreate={state.dateCreate}
          />
        }
        maxWidth="lg"
        onClose={handleCloseCreateMeetingPage}
        open={state.createMeetingPage}
      />
      <DialogStyled
        component={
          <UpdateMeeting
            meetingId={state.meetingId}
            onClose={handleCloseUpdateMeetingPage}
          />
        }
        onClose={handleCloseUpdateMeetingPage}
        maxWidth="md"
        open={state.updateMeetingPage}
      />
    </>
  );
};

export default PageDialogs;
