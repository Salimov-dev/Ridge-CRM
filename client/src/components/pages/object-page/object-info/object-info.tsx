import { useState } from "react";
// libraries
import { Box, styled } from "@mui/material";
import { useSelector } from "react-redux";
// components
import Dialogs from "./components/dialogs";
import ObjectsParams from "./components/object-params";
import ObjectTasks from "./components/object-tasks";
import ObjectMeetings from "./components/object-meetings";
import Loader from "@common/loader/loader";
import LastContacts from "./components/last-contacts";
import DialogStyled from "@components/common/dialog/dialog-styled";
import CreateMyTask from "@components/pages/create-my-task/create-my-task";
import UpdateMyTask from "@components/pages/update-my-task/update-my-task";
import CreateManagerTask from "@components/pages/create-manager-task/create-manager-task";
import UpdateManagerTask from "@components/pages/update-manager-task/update-manager-task";
import CreateLastContact from "@components/pages/create-last-contact/create-last-contact";
import UpdateLastContact from "@components/pages/update-last-contact/update-last-contact";
// utils
import transformObjectsForSelect from "@utils/objects/transform-objects-for-select";
import transformUsersForSelect from "@utils/objects/transform-users-for-select";
// columns
import { tasksColumns } from "@columns/tasks-columns/tasks-columns";
// store
import { getObjectsList } from "@store/object/objects.store";
import {
  getCurrentUserId,
  getIsUserCurator,
  getUsersList,
} from "@store/user/users.store";
import CreateMeeting from "@components/pages/create-meeting/create-meeting";
import UpdateMeeting from "@components/pages/update-meeting/update-meeting";

const Component = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 20px;
`;

const ObjectInfo = ({ object, objectId, isLoading, isAuthorEntity = true }) => {
  const objects = useSelector(getObjectsList());

  const users = useSelector(getUsersList());
  const currentUserId = useSelector(getCurrentUserId());
  const isCurator = useSelector(getIsUserCurator(currentUserId));

  const usersWithoutCurrentUser = users?.filter(
    (user) => user?._id !== currentUserId
  );
  const transformUsers = transformUsersForSelect(usersWithoutCurrentUser);

  const currentUserObjects = objects?.filter(
    (obj) => obj?.userId === currentUserId
  );

  const actualObjects = isCurator ? objects : currentUserObjects;
  const transformObjects = transformObjectsForSelect(actualObjects);

  const [state, setState] = useState({
    createMyTaskPage: false,
    updateMyTaskPage: false,
    createManagerTaskPage: false,
    updateManagerTaskPage: false,
    createLastContactPage: false,
    updateLastContactPage: false,
    createMeetingPage: false,
    updateMeetingPage: false,
    taskId: "",
    lastContactId: "",
    meetingId: "",
  });
  // console.log("state", state);

  // обновление стейта при создании задачи себе
  const handleOpenCreateMyTaskPage = () => {
    setState((prevState) => ({
      ...prevState,
      createMyTaskPage: true,
    }));
  };
  const handleCloseCreateMyTaskPage = () => {
    setState((prevState) => ({ ...prevState, createMyTaskPage: false }));
  };

  // обновление стейта при обновлении задачи себе
  const handleOpenUpdateMyTaskPage = (taskId) => {
    setState((prevState) => ({
      ...prevState,
      updateMyTaskPage: true,
      taskId: taskId,
    }));
  };
  const handleCloseUpdateMyTaskPage = () => {
    setState((prevState) => ({ ...prevState, updateMyTaskPage: false }));
  };

  // обновление стейта при создании задачи менеджеру
  const handleOpenCreateManagerTaskPage = () => {
    setState((prevState) => ({
      ...prevState,
      createManagerTaskPage: true,
    }));
  };
  const handleCloseCreateManagerTaskPage = () => {
    setState((prevState) => ({ ...prevState, createManagerTaskPage: false }));
  };

  // обновление стейта при обновлении задачи менеджеру
  const handleOpenUpdateManagerTaskPage = (taskId) => {
    setState((prevState) => ({
      ...prevState,
      updateManagerTaskPage: true,
      taskId: taskId,
    }));
  };
  const handleCloseUpdateManagerTaskPage = () => {
    setState((prevState) => ({ ...prevState, updateManagerTaskPage: false }));
  };

  // обновление стейта при создании последнего контакта
  const handleOpenCreateLastContactPage = () => {
    setState((prevState) => ({
      ...prevState,
      createLastContactPage: true,
    }));
  };
  const handleCloseCreateLastContactPage = () => {
    setState((prevState) => ({
      ...prevState,
      createLastContactPage: false,
    }));
  };

  // обновление стейта при обновлении последнего контакта
  const handleOpenUpdateLastContactPage = (lastContactId) => {
    setState((prevState) => ({
      ...prevState,
      updateLastContactPage: true,
      lastContactId: lastContactId,
    }));
  };
  const handleCloseUpdateLastContactPage = () => {
    setState((prevState) => ({
      ...prevState,
      updateLastContactPage: false,
    }));
  };

  // обновление стейта при создании встречи
  const handleOpenCreateMeetingPage = () => {
    setState((prevState) => ({
      ...prevState,
      createMeetingPage: true,
    }));
  };
  const handleCloseCreateMeetingPage = () => {
    setState((prevState) => ({
      ...prevState,
      createMeetingPage: false,
    }));
  };

  // обновление стейта при обновлении встречи
  const handleOpenUpdateMeetingPage = (meetingId) => {
    setState((prevState) => ({
      ...prevState,
      updateMeetingPage: true,
      meetingId: meetingId,
    }));
  };
  const handleCloseUpdateMeetingPage = () => {
    setState((prevState) => ({
      ...prevState,
      updateMeetingPage: false,
    }));
  };

  return !isLoading ? (
    <Component>
      <ObjectsParams object={object} isLoading={isLoading} />
      <ObjectTasks
        object={object}
        objectId={objectId}
        onOpenCreateMyTask={handleOpenCreateMyTaskPage}
        onOpenCreateManagerTask={handleOpenCreateManagerTaskPage}
        columns={tasksColumns(
          handleOpenUpdateMyTaskPage,
          handleOpenUpdateManagerTaskPage
        )}
        isAuthorEntity={isAuthorEntity}
      />
      <ObjectMeetings
        object={object}
        objectId={objectId}
        onOpen={handleOpenCreateMeetingPage}
        onUpdate={handleOpenUpdateMeetingPage}
        isAuthorEntity={isAuthorEntity}
      />
      <LastContacts
        object={object}
        objectId={objectId}
        onOpen={handleOpenCreateLastContactPage}
        onUpdate={handleOpenUpdateLastContactPage}
        isAuthorEntity={isAuthorEntity}
      />

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
    </Component>
  ) : (
    <Loader />
  );
};

export default ObjectInfo;
