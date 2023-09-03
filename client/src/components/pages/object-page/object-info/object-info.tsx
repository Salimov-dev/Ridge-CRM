// libraries
import { useState } from "react";
import { Box, styled } from "@mui/material";
import { useSelector } from "react-redux";
// components
import Dialogs from "./components/dialogs";
import ObjectsParams from "./components/object-params";
import ObjectTasks from "./components/object-tasks";
import ObjectMeetings from "./components/object-meetings";
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
import { loadUpdateMeetingOpenState } from "../../../../store/meeting/update-meeting.store";
import { loadupdateMyTaskOpenState } from "../../../../store/task/update-task.store";
import { loadUpdateManagerTaskOpenState } from "../../../../store/task/update-manager-task.store";

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

  const isOpenUpdateMeeting = useSelector(loadUpdateMeetingOpenState());
  const isOpenUpdateMyTask = useSelector(loadupdateMyTaskOpenState());
  const isOpenUpdateManagerTask = useSelector(loadUpdateManagerTaskOpenState());

  const meetings = useSelector(getObjectMeetingsList(object?._id));
  const isMeetingsLoading = useSelector(getMeetingLoadingStatus());

  const tasks = useSelector(getObjectTasksList(object?._id));
  const isTasksLoading = useSelector(getTaskLoadingStatus());

  const users = useSelector(getUsersList());
  const objects = useSelector(getObjectsList());

  const currentUserId = useSelector(getCurrentUserId());
  const usersWithoutCurrentUser = users.filter(
    (user) => user?._id !== currentUserId
  );
  const currentUserObjects = objects?.filter(
    (obj) => obj?.userId === currentUserId
  );

  let transformUsers = [];
  usersWithoutCurrentUser?.forEach((user) => {
    transformUsers?.push({
      _id: user?._id,
      name: `${user?.name?.lastName} ${user?.name?.firstName}`,
    });
  });

  let transformObjects = [];
  currentUserObjects?.forEach((obj) => {
    transformObjects?.push({ _id: obj?._id, name: obj?.location.address });
  });

  const {
    handleOpenCreateMeeting,
    handleOpenCreateManagerTask,
    handleOpenCreateMyTask,
    handleCloseCreateMeeting,
    handleCloseCreateManagerTask,
    handleCloseCreateMyTask,
    handleCloseUpdateMeeting,
    handleCloseUpdateMyTask,
    handleCloseUpdateManagerTask,
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
      <Dialogs
        object={object}
        objects={transformObjects}
        users={transformUsers}
        openCreateMyTask={openCreateMyTask}
        openCreateManagerTask={openCreateManagerTask}
        openCreateMeeting={openCreateMeeting}
        dateCreateMyTask={dateCreateMyTask}
        handleCloseCreateMeeting={handleCloseCreateMeeting}
        handleCloseCreateManagerTask={handleCloseCreateManagerTask}
        handleCloseCreateMyTask={handleCloseCreateMyTask}
        handleCloseUpdateMeeting={handleCloseUpdateMeeting}
        handleCloseUpdateMyTask={handleCloseUpdateMyTask}
        handleCloseUpdateManagerTask={handleCloseUpdateManagerTask}
        isOpenUpdateManagerTask={isOpenUpdateManagerTask}
        isOpenUpdateMyTask={isOpenUpdateMyTask}
        isOpenUpdateMeeting={isOpenUpdateMeeting}
      />
    </Component>
  );
};

export default ObjectInfo;
