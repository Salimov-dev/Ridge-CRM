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
import UpdatePresentation from "@components/pages/presentation/update-presentation";
import AuthPage from "@components/pages/auth/auth.page";
import UpdateProfile from "@components/pages/user/update-profile";
import UpdatePassword from "@components/pages/user/update-password";
import CreateUser from "@components/pages/user/create-user";
import MakePaymentPage from "@components/pages/payment/make-payment";
import CreateContact from "@components/pages/contact/create-contact";
import UpdateContact from "@components/pages/contact/update-contact";
import CreateCompany from "@components/pages/company/create-company";
import UpdateCompany from "@components/pages/company/update-company";

const PageDialogs = ({
  state,
  setState,
  objects = [],
  users = [],
  selectedObjects = [],
  setRowSelection = () => {}
}) => {
  const {
    handleCloseCreateObjectPage,
    handleOpenUpdateObjectPage,
    handleCloseUpdateObjectPage,
    handleCloseObjectPage,
    handleOpenCreatePresentationPage,
    handleCloseCreatePresentationPage,
    handleCloseUpdatePresentationPage,
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
    handleCloseAuthPage,
    handleCloseUpdateProfilePage,
    handleCloseUpdatePasswordPage,
    handleCloseCreateUserPage,
    handleCloseMakePaymentPage,
    handleCloseCreateContactPage,
    handleCloseContactPage,
    handleCloseCreateCompanyPage,
    handleCloseUpdateCompanyPage
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
          <CreatePresentation
            objectId={state.objectId}
            onClose={handleCloseCreatePresentationPage}
          />
        }
        onClose={handleCloseUpdateObjectPage}
        maxWidth="sm"
        open={state.presentationPage}
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
            isObjectPage={!!state?.objectId?.length}
            objects={objects}
            objectId={state.objectId}
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
            isObjectPage={!!state?.objectId?.length}
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
            objectId={state.objectId}
            dateCreate={state.dateCreate}
            users={users}
            isObjectPage={!!state?.objectId?.length}
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
            isObjectPage={!!state?.objectId?.length}
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
            isObjectPage={!state?.objectId}
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
            isObjectPage={!state?.objectId}
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
        component={
          <AuthPage onClose={handleCloseAuthPage} startPage={state.startPage} />
        }
        maxWidth="sm"
        fullWidth={false}
        onClose={handleCloseAuthPage}
        open={state.authPage}
      />
      <DialogStyled
        component={<UpdateProfile onClose={handleCloseUpdateProfilePage} />}
        onClose={handleCloseUpdateProfilePage}
        open={state.updateProfilePage}
        maxWidth="sm"
      />
      <DialogStyled
        component={<UpdatePassword onClose={handleCloseUpdatePasswordPage} />}
        onClose={handleCloseUpdatePasswordPage}
        open={state.updatePasswordPage}
        maxWidth="xs"
      />
      <DialogStyled
        component={<CreateUser onClose={handleCloseCreateUserPage} />}
        onClose={handleCloseCreateUserPage}
        open={state.createUserPage}
        maxWidth="sm"
      />
      <DialogStyled
        component={<MakePaymentPage onClose={handleCloseMakePaymentPage} />}
        onClose={handleCloseMakePaymentPage}
        open={state.makePaymentPage}
        maxWidth="sm"
      />
      {/* Окна для Контакта */}
      <DialogStyled
        component={<CreateContact onClose={handleCloseCreateContactPage} />}
        maxWidth="sm"
        onClose={handleCloseCreateContactPage}
        open={state.createContactPage}
      />
      <DialogStyled
        component={
          <UpdateContact
            contactId={state.contactId}
            onClose={handleCloseContactPage}
          />
        }
        onClose={handleCloseContactPage}
        maxWidth="sm"
        open={state.openContactPage}
      />
      {/* Окна для Компании */}
      <DialogStyled
        component={
          <CreateCompany
            onClose={handleCloseCreateCompanyPage}
            isHideElement={state.isHideElement}
          />
        }
        maxWidth="sm"
        onClose={handleCloseCreateCompanyPage}
        open={state.createCompanyPage}
      />{" "}
      {/* Окна для Компании обновления */}
      <DialogStyled
        component={
          <UpdateCompany
            companyId={state.companyId}
            onClose={handleCloseUpdateCompanyPage}
          />
        }
        onClose={handleCloseUpdateCompanyPage}
        maxWidth="sm"
        open={state.updateCompanyPage}
      />
    </>
  );
};

export default PageDialogs;
