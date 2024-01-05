import { useSelector } from "react-redux";
// components
import DialogStyled from "@components/common/dialog/dialog-styled";
import CreateLastContact from "@components/pages/last-contact/create-last-contact";
import CreateManagerTask from "@components/pages/task/create-manager-task";
import CreateMeeting from "@components/pages/meeting/create-meeting";
import CreateMyTask from "@components/pages/task/create-my-task";
import UpdateLastContact from "@components/pages/last-contact/update-last-contact";
import UpdateManagerTask from "@components/pages/task/update-manager-task";
import UpdateMeeting from "@components/pages/meeting/update-meeting";
import UpdateMyTask from "@components/pages/task/update-my-task";
// hooks
import useObjectInfo from "../../../../../hooks/object-info/use-object-info.hook";
// store
import { getObjectsList } from "@store/object/objects.store";
import { getUsersList } from "@store/user/users.store";

const Dialogs = ({ state, objectId, setState }) => {
  const objects = useSelector(getObjectsList());
  const users = useSelector(getUsersList());

  const {
    handleCloseCreateMyTaskPage,
    handleCloseUpdateMyTaskPage,
    handleCloseCreateManagerTaskPage,
    handleCloseUpdateManagerTaskPage,
    handleCloseCreateLastContactPage,
    handleCloseUpdateLastContactPage,
    handleCloseCreateMeetingPage,
    handleCloseUpdateMeetingPage,
  } = useObjectInfo(setState);

  return (
    <>
      <DialogStyled
        component={
          <CreateMyTask
            title="Добавить себе задачу"
            objectPageId={objectId}
            isObjectPage={state.createMyTaskPage}
            objects={objects}
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
            objectId={objectId}
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
            objectPageId={objectId}
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
            objectPageId={objectId}
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
            objectPageId={objectId}
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

export default Dialogs;
