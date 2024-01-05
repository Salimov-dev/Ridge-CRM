// hooks
import useDialogHandlers from "@hooks/dialog/use-dialog-handlers";
// components
import DialogStyled from "@components/common/dialog/dialog-styled";
import ObjectPage from "@components/pages/object-page/object-page";
import CreateObject from "@components/pages/object/create-object/create-object";
import UpdateObject from "@components/pages/object/update-object";
import CreatePresentation from "@components/pages/presentation/create-presentation";
import TransferObjectToAnotherManager from "@components/pages/transfer-object-to-another-manager/transfer-object-to-another-manager";
import UpdateMeeting from "@components/pages/meeting/update-meeting";
import CreateMeeting from "@components/pages/meeting/create-meeting";
import UpdateLastContact from "@components/pages/last-contact/update-last-contact";
import CreateLastContact from "@components/pages/last-contact/create-last-contact";
import UpdateManagerTask from "@components/pages/task/update-manager-task";
import CreateManagerTask from "@components/pages/task/create-manager-task";
import UpdateMyTask from "@components/pages/task/update-my-task";
import CreateMyTask from "@components/pages/task/create-my-task";
import UpdateAvatar from "@components/pages/user/update-avatar-user";
import Login from "@components/pages/user/login";

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
    handleCloseUpdateUserAvatarPage,
    handleCloseLoginPage,
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
      <DialogStyled
        component={<UpdateAvatar onClose={handleCloseUpdateUserAvatarPage} />}
        maxWidth="sm"
        onClose={handleCloseUpdateUserAvatarPage}
        open={state.avatarUpdatePage}
      />
      <DialogStyled
        component={<Login onClose={handleCloseLoginPage} />}
        maxWidth="sm"
        fullWidth={false}
        onClose={handleCloseLoginPage}
        open={state.loginPage}
      />
    </>
  );
};

export default PageDialogs;