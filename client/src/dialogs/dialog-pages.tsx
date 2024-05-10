// hooks
import useDialogHandlers from "@hooks/dialog/use-dialog-handlers";
// components
import DialogStyled from "@components/common/dialog/dialog-styled";
import ObjectPage from "@components/pages/object-page/object-page";
import CreateObject from "@components/pages/object/create-object/create-object.page";
import UpdateObject from "@components/pages/object/update-object.page";
import CreatePresentation from "@components/pages/presentation/create-presentation/create-presentation.page";
import TransferObjectToAnotherManager from "@components/pages/transfer-object-to-another-manager/transfer-object-to-another-manager.page.page";
import UpdateMeeting from "@components/pages/meeting/update-meeting.page";
import CreateMeeting from "@components/pages/meeting/create-meeting.page";
import UpdateLastContact from "@components/pages/last-contact/update-last-contact.page";
import CreateLastContact from "@components/pages/last-contact/create-last-contact.page";
import UpdateManagerTask from "@components/pages/task/update-manager-task";
import CreateManagerTask from "@components/pages/task/create-manager-task";
import UpdateTask from "@components/pages/task/update-task";
import CreateMyTask from "@components/pages/task/create-my-task";
import UpdateAvatar from "@components/pages/avatar/update-avatar-user";
import UpdatePresentation from "@components/pages/presentation/update-presentation/update-presentation.page";
import AuthPage from "@components/pages/auth/auth.page";
import UpdateProfile from "@components/pages/profile/update-profile";
import UpdatePassword from "@components/pages/password/update-password/update-password";
import CreateUser from "@components/pages/user/create-user/create-user";
import MakePaymentPage from "@components/pages/payment/make-payment.page";
import CreateContact from "@components/pages/contact/create-contact.page";
import UpdateContact from "@components/pages/contact/update-contact.page";
import CreateCompany from "@components/pages/company/create-company.page";
import UpdateCompany from "@components/pages/company/update-company.page";
import Agreement from "@components/pages/agreement/agreement";
import PersonalPolicy from "@components/pages/agreement/personal-policy";
import UpdateUser from "@components/pages/user/update-user/update-user";
import VideoPlayerPage from "@components/pages/video-training/video-training.page";
import PresentationPageDialogs from "./dialog-pages/presentations.dialog-pages";
import PresentationDialogPages from "./dialog-pages/presentations.dialog-pages";
import { Dispatch, SetStateAction } from "react";
import { IDialogPagesState } from "@interfaces/state/dialog-pages-state.interface";
import VideoTrainingDialogPages from "./dialog-pages/video-training.dialog-pages";
import { IObject } from "@interfaces/object/object.interface";
import { IUser } from "@interfaces/users/user.interface";
import PresentationsDialogPages from "./dialog-pages/presentations.dialog-pages";
import MeetingsDialogPages from "./dialog-pages/meetings.dialog-pages";
import ObjectsDialogPages from "./dialog-pages/objects.dialog-pages";

interface DialogPagesProps {
  state: IDialogPagesState;
  setState: Dispatch<SetStateAction<IDialogPagesState>>;
  objects?: IObject[];
  users?: IUser[];
  selectedObjects?: string[];
  setRowSelection?: () => void;
  videoTitle?: string;
  videoSrc?: string;
  isObjectPage?: boolean;
}

const DialogPages = ({
  state,
  setState,
  objects = [],
  users = [],
  selectedObjects = [],
  setRowSelection = () => {},
  videoTitle = "",
  videoSrc = "",
  isObjectPage = false
}: DialogPagesProps) => {
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
    handleCloseUpdateCompanyPage,
    handleCloseAgreementPage,
    handleClosePersonalPolicyPage,
    handleCloseUpdateUserPage,
    handleCloseVideoPlayerPage
  } = useDialogHandlers(setState);

  return (
    <>
      <ObjectsDialogPages
        state={state}
        setState={setState}
        selectedObjects={selectedObjects}
        setRowSelection={setRowSelection}
      />
      <MeetingsDialogPages state={state} setState={setState} />
      <PresentationsDialogPages state={state} setState={setState} />
      <VideoTrainingDialogPages
        state={state}
        setState={setState}
        videoTitle={videoTitle}
        videoSrc={videoSrc}
      />

      {/* <DialogStyled
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
      /> */}
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
          <UpdateTask
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
            isObjectPage={true}
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
      {/* <DialogStyled
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
      /> */}
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
        maxWidth="xs"
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

      {/* Окна для Члена команды */}
      <DialogStyled
        component={<CreateUser onClose={handleCloseCreateUserPage} />}
        onClose={handleCloseCreateUserPage}
        open={state.createUserPage}
        maxWidth="sm"
      />
      <DialogStyled
        component={
          <UpdateUser
            userId={state.userId}
            onClose={handleCloseUpdateUserPage}
          />
        }
        onClose={handleCloseUpdateUserPage}
        maxWidth="sm"
        open={state.updateUserPage}
      />

      {/* Окна для Страницы оплаты */}
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
        component={<CreateCompany onClose={handleCloseCreateCompanyPage} />}
        maxWidth="sm"
        onClose={handleCloseCreateCompanyPage}
        open={state.createCompanyPage}
      />

      {/* Окна для обновления Компании  */}
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

      {/* Окна для лицензии и персональных данных */}
      <DialogStyled
        component={<Agreement onClose={handleCloseAgreementPage} />}
        onClose={handleCloseAgreementPage}
        maxWidth="xl"
        open={state.agreementPage}
      />
      <DialogStyled
        component={<PersonalPolicy onClose={handleClosePersonalPolicyPage} />}
        onClose={handleClosePersonalPolicyPage}
        maxWidth="xl"
        open={state.personalPolicyPage}
      />
    </>
  );
};

export default DialogPages;
