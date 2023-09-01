import { Box, styled } from "@mui/material";
import { useSelector } from "react-redux";
import {
  getMeetingLoadingStatus,
  getObjectMeetingsList,
} from "../../../../store/meeting/meetings.store";
import {
  getObjectTasksList,
  getTaskLoadingStatus,
} from "../../../../store/task/tasks.store";
import ObjectMeetings from "./components/object-meetings";
import ObjectsParams from "./components/object-params";
import ObjectTasks from "./components/object-tasks";
import { useState } from "react";
import DialogStyled from "../../../common/dialog/dialog-styled";
import CreateMeeting from "../../create-meeting/create-meeting";
import CreateManagerTask from "../../../../layouts/calendar/components/create-manager-task/create-manager-task";
import CreateMyTask from "../../../../layouts/calendar/components/create-my-task/create-my-task";

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
  const meetings = useSelector(getObjectMeetingsList(object._id));
  const tasks = useSelector(getObjectTasksList(object._id));
  const isMeetingsLoading = useSelector(getMeetingLoadingStatus());
  const isTasksLoading = useSelector(getTaskLoadingStatus());

  const handleOpenCreateMeeting = () => {
    setOpenCreateMeeting(true);
  };

  const handleOpenCreateManagerTask = () => {
    setOpenCreateManagerTask(true);
    setOpenCreateMyTask(false);
  };

  const handleOpenCreateMyTask = () => {
    setOpenCreateMyTask(true);
  };
  const handleCloseCreateMeeting = () => {
    setOpenCreateMeeting(false);
  };
  const handleCloseCreateManagerTask = () => {
    setOpenCreateManagerTask(false);
  };
  const handleCloseCreateMyTask = () => {
    setOpenCreateMyTask(false);
  };

  return (
    <Component>
      <ObjectsParams object={object} isLoading={isLoading} />
      <ObjectMeetings
        meetings={meetings}
        isMeetingsLoading={isMeetingsLoading}
        onOpenCreateMeeting={handleOpenCreateMeeting}
      />
      <ObjectTasks
        tasks={tasks}
        isTasksLoading={isTasksLoading}
        onCreateMyTask={handleOpenCreateMyTask}
        onCreateManagerTask={handleOpenCreateManagerTask}
      />

      <DialogStyled
        component={<CreateMeeting onClose={handleCloseCreateMeeting} />}
        onClose={handleCloseCreateMeeting}
        open={openCreateMeeting}
      />

      <DialogStyled
        onClose={handleCloseCreateManagerTask}
        open={openCreateManagerTask}
        maxWidth="sm"
        fullWidth={false}
        component={
          <CreateManagerTask
            title="Добавить менеджеру задачу"
            // objects={objects}
            // users={users}
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
            // objects={objects}
            // date={dateCreateMyTask}
            onClose={handleCloseCreateMyTask}
          />
        }
      />
    </Component>
  );
};

export default ObjectInfo;
