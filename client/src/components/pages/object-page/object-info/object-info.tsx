import { useState } from "react";
// libraries
import { Box, styled } from "@mui/material";
// components
import Dialogs from "./components/dialogs";
import ObjectsParams from "./components/object-params";
import ObjectTasks from "./components/object-tasks";
import ObjectMeetings from "./components/object-meetings";
import Loader from "@common/loader/loader";
import LastContacts from "./components/last-contacts";
// columns
import { tasksColumns } from "@columns/tasks.columns";
// hooks
import useObjectInfo from "./hooks/use-object-info.hook";
import { meetingsColumns } from "@columns/meetings.columns";

const Component = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 20px;
`;

const ObjectInfo = ({ object, objectId, isLoading, isAuthorEntity = true }) => {
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

  const {
    handleOpenCreateMyTaskPage,
    handleOpenUpdateMyTaskPage,
    handleOpenCreateManagerTaskPage,
    handleOpenUpdateManagerTaskPage,
    handleOpenCreateLastContactPage,
    handleOpenUpdateLastContactPage,
    handleOpenCreateMeetingPage,
    handleOpenUpdateMeetingPage,
  } = useObjectInfo(setState);

  const isDialogPage = true;

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
          handleOpenUpdateManagerTaskPage,
          isDialogPage
        )}
        isAuthorEntity={isAuthorEntity}
      />
      <ObjectMeetings
        object={object}
        objectId={objectId}
        onOpen={handleOpenCreateMeetingPage}
        columns={meetingsColumns(handleOpenUpdateMeetingPage, isDialogPage)}
        isAuthorEntity={isAuthorEntity}
      />
      <LastContacts
        object={object}
        objectId={objectId}
        onOpen={handleOpenCreateLastContactPage}
        onUpdate={handleOpenUpdateLastContactPage}
        isAuthorEntity={isAuthorEntity}
      />
      <Dialogs state={state} objectId={objectId} setState={setState} />
    </Component>
  ) : (
    <Loader />
  );
};

export default ObjectInfo;
