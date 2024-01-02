// libraries
import { Box, styled } from "@mui/material";
import { useSelector } from "react-redux";
// components
import Dialogs from "./components/dialogs";
import ObjectsParams from "./components/object-params";
import ObjectTasks from "./components/object-tasks";
import ObjectMeetings from "./components/object-meetings";
import Loader from "../../../common/loader/loader";
import LastContacts from "./components/last-contacts";
// store
import { getObjectsList } from "@store/object/objects.store";
import {
  getCurrentUserId,
  getIsUserCurator,
  getUsersList,
} from "@store/user/users.store";
// utils
import transformObjectsForSelect from "@utils/objects/transform-objects-for-select";
import transformUsersForSelect from "@utils/objects/transform-users-for-select";
import DialogStyled from "@components/common/dialog/dialog-styled";
import CreateMyTask from "@components/pages/create-my-task/create-my-task";
import { useState } from "react";
import { tasksColumns } from "@columns/tasks-columns/tasks-columns";
import UpdateMyTask from "@components/pages/update-my-task/update-my-task";
import CreateManagerTask from "@components/pages/create-manager-task/create-manager-task";
import UpdateManagerTask from "@components/pages/update-manager-task/update-manager-task";

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
    taskId: "",
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
  const handleOpenCreateManagerTaskPage = (taskId) => {
    setState((prevState) => ({
      ...prevState,
      createManagerTaskPage: true,
      taskId: taskId,
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
        isAuthorEntity={isAuthorEntity}
      />
      <LastContacts
        object={object}
        objectId={objectId}
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

      <Dialogs objects={transformObjects} users={transformUsers} />
    </Component>
  ) : (
    <Loader />
  );
};

export default ObjectInfo;
