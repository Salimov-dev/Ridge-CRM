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

  return !isLoading ? (
    <Component>
      <ObjectsParams object={object} isLoading={isLoading} />
      <ObjectTasks
        object={object}
        objectId={objectId}
        onOpen={handleOpenCreateMyTaskPage}
        columns={tasksColumns(handleOpenUpdateMyTaskPage)}
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
        fullWidth={false}
        component={
          <UpdateMyTask
            title="Изменить свою задачу"
            taskId={state.taskId}
            objectId={objectId}
            onClose={handleCloseUpdateMyTaskPage}
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
