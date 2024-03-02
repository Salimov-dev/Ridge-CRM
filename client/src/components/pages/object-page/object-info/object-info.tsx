// libraries
import { useState } from "react";
import { useSelector } from "react-redux";
import { Box, styled } from "@mui/material";
// components
import ObjectsParams from "./components/object-params";
import ObjectTasks from "./components/object-tasks";
import ObjectMeetings from "./components/object-meetings";
import LastContacts from "./components/last-contacts";
import PageDialogs from "@components/common/dialog/page-dialogs";
// columns
import { tasksColumns } from "@columns/tasks.columns";
import { meetingsColumns } from "@columns/meetings.columns";
// hooks
import useObjectInfo from "@hooks/object-info/use-object-info.hook";
// store
import { getObjectsList } from "@store/object/objects.store";
import { getCurrentUserId, getIsUserCurator } from "@store/user/users.store";
import FieldsCompany from "@components/common/forms/dynamic-fields/fields-company";
import FieldsContact from "@components/common/forms/dynamic-fields/fields-contact";

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
    objectId: "",
    lastContactId: "",
    meetingId: ""
  });

  const objects = useSelector(getObjectsList());

  const currentUserId = useSelector(getCurrentUserId());
  const isCurator = useSelector(getIsUserCurator(currentUserId));
  const currentUserObjects = objects?.filter(
    (obj) => obj?.userId === currentUserId
  );
  const actualObjects = isCurator ? currentUserObjects : objects;

  const {
    handleOpenCreateMyTaskPage,
    handleOpenUpdateMyTaskPage,
    handleOpenCreateManagerTaskPage,
    handleOpenUpdateManagerTaskPage,
    handleOpenCreateLastContactPage,
    handleOpenUpdateLastContactPage,
    handleOpenCreateMeetingPage,
    handleOpenUpdateMeetingPage
  } = useObjectInfo(setState);

  const isDialogPage = true;

  return (
    <Component>
      <ObjectsParams object={object} isLoading={isLoading} />

      <ObjectTasks
        object={object}
        objectId={objectId}
        onOpenCreateMyTask={handleOpenCreateMyTaskPage}
        onOpenCreateManagerTask={handleOpenCreateManagerTaskPage}
        isAuthorEntity={isAuthorEntity}
        columns={tasksColumns(
          handleOpenUpdateMyTaskPage,
          handleOpenUpdateManagerTaskPage,
          () => {},
          isDialogPage
        )}
      />
      <ObjectMeetings
        object={object}
        objectId={objectId}
        onOpenCreateMeeting={handleOpenCreateMeetingPage}
        columns={meetingsColumns(
          handleOpenUpdateMeetingPage,
          () => {},
          isDialogPage,
          isCurator
        )}
        isAuthorEntity={isAuthorEntity}
      />
      <LastContacts
        object={object}
        objectId={objectId}
        onOpen={handleOpenCreateLastContactPage}
        onUpdate={handleOpenUpdateLastContactPage}
        isAuthorEntity={isAuthorEntity}
      />
      <PageDialogs state={state} setState={setState} objects={actualObjects} />
    </Component>
  );
};

export default ObjectInfo;
