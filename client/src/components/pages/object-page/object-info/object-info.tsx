// libraries
import { useState } from "react";
import { Box, styled } from "@mui/material";
import { useSelector } from "react-redux";
// layout
import CreateManagerTask from "../../../../layouts/calendar/components/create-manager-task/create-manager-task";
import CreateMyTask from "../../../../layouts/calendar/components/create-my-task/create-my-task";
// components
import ObjectsParams from "./components/object-params";
import ObjectTasks from "./components/object-tasks";
import ObjectMeetings from "./components/object-meetings";
import CreateMeeting from "../../create-meeting/create-meeting";
import DialogStyled from "../../../common/dialog/dialog-styled";
// hooks
import useObjectInfo from "../../../../hooks/object/use-object-info";
// store
import { getObjectsList } from "../../../../store/object/objects.store";
import {
  getMeetingLoadingStatus,
  getObjectMeetingsList,
} from "../../../../store/meeting/meetings.store";
import {
  getObjectTasksList,
  getTaskLoadingStatus,
} from "../../../../store/task/tasks.store";
import {
  getCurrentUserId,
  getUsersList,
} from "../../../../store/user/users.store";
import UpdateMeeting from "../../update-meeting/update-meeting";
import { loadUpdateMeetingOpenState } from "../../../../store/meeting/update-meeting.store";

const Component = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 20px;
`;

const ObjectInfo = ({ object, isLoading }) => {
  const [openCreateMyTask, setOpenCreateMyTask] = useState(false);
  const [openCreateManagerTask, setOpenCreateManagerTask] = useState(false);
  const [openCreateMeeting, setOpenCreateMeeting] = useState(false);
  const [dateCreateMyTask, setDateCreateMyTask] = useState(null);

  const meetings = useSelector(getObjectMeetingsList(object._id));
  const isOpenUpdateMeeting = useSelector(loadUpdateMeetingOpenState());
  const isMeetingsLoading = useSelector(getMeetingLoadingStatus());

  const tasks = useSelector(getObjectTasksList(object._id));
  const isTasksLoading = useSelector(getTaskLoadingStatus());

  const users = useSelector(getUsersList());
  const currentUserId = useSelector(getCurrentUserId());
  const usersWithoutCurrentUser = users.filter(
    (user) => user._id !== currentUserId
  );
  let transformUsers = [];
  usersWithoutCurrentUser?.forEach((user) => {
    transformUsers?.push({
      _id: user._id,
      name: `${user.name.lastName} ${user.name.firstName}`,
    });
  });

  const objectId = object._id;
  const objects = useSelector(getObjectsList());
  const currentUserObjects = objects?.filter(
    (obj) => obj?.userId === currentUserId
  );
  let transformObjects = [];
  currentUserObjects?.forEach((obj) => {
    transformObjects?.push({ _id: obj._id, name: obj.location.address });
  });

  const {
    handleOpenCreateMeeting,
    handleOpenCreateManagerTask,
    handleOpenCreateMyTask,
    handleCloseCreateMeeting,
    handleCloseCreateManagerTask,
    handleCloseCreateMyTask,
    handleCloseUpdateMeeting,
  } = useObjectInfo(
    setOpenCreateMeeting,
    setOpenCreateMyTask,
    setOpenCreateManagerTask,
    setDateCreateMyTask
  );

  return (
    <Component>
      <ObjectsParams object={object} isLoading={isLoading} />
      <ObjectMeetings
        meetings={meetings}
        object={object}
        isMeetingsLoading={isMeetingsLoading}
        onOpenCreateMeeting={handleOpenCreateMeeting}
      />
      <ObjectTasks
        tasks={tasks}
        object={object}
        isTasksLoading={isTasksLoading}
        onCreateMyTask={handleOpenCreateMyTask}
        onCreateManagerTask={handleOpenCreateManagerTask}
      />

      <DialogStyled
        component={
          <CreateMeeting
            onClose={handleCloseCreateMeeting}
            objectPageId={objectId}
          />
        }
        onClose={handleCloseCreateMeeting}
        open={openCreateMeeting}
      />

      <DialogStyled
        component={<UpdateMeeting onClose={handleCloseUpdateMeeting} />}
        onClose={handleCloseUpdateMeeting}
        open={isOpenUpdateMeeting}
        fullWidth={false}
      />

      <DialogStyled
        onClose={handleCloseCreateManagerTask}
        open={openCreateManagerTask}
        maxWidth="sm"
        fullWidth={false}
        component={
          <CreateManagerTask
            title="Добавить менеджеру задачу"
            objectPageId={objectId}
            objects={transformObjects}
            users={transformUsers}
            onClose={handleCloseCreateManagerTask}
          />
        }
      />

      <DialogStyled
        onClose={handleCloseCreateMyTask}
        open={openCreateMyTask}
        maxWidth="sm"
        fullWidth={false}
        component={
          <CreateMyTask
            title="Добавить себе задачу"
            date={dateCreateMyTask}
            objectPageId={objectId}
            objects={transformObjects}
            onClose={handleCloseCreateMyTask}
          />
        }
      />
    </Component>
  );
};

export default ObjectInfo;
