import styled from "@emotion/styled";
import { Box } from "@mui/material";
import { useSelector } from "react-redux";
// components
import LastContacts from "./components/last-contacts";
import ObjectMeetings from "./components/object-meetings";
import ObjectTasks from "./components/object-tasks";
// hooks
import useDialogHandlers from "@hooks/dialog/use-dialog-handlers";
import useObjectInfo from "@hooks/object-info/use-object-info.hook";
// columns
import { tasksColumns } from "@columns/tasks.columns";
import { meetingsColumns } from "@columns/meetings.columns";
// hooks
import {
  getCurrentUserId,
  getIsUserAuthorThisEntity,
  getIsUserCurator
} from "@store/user/users.store";

const Component = styled(Box)`
  display: flex;
  flex-direction: column;
`;

const Acitivty = ({ object, objectId, setState }) => {
  const isDialogPage = true;
  const currentUserId = useSelector(getCurrentUserId());
  const isCurator = useSelector(getIsUserCurator(currentUserId));
  const isAuthorEntity = useSelector(
    getIsUserAuthorThisEntity(currentUserId, object)
  );

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

  const { handleOpenContactPage } = useDialogHandlers(setState);

  return (
    <Component>
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
        objectId={objectId}
        onOpen={handleOpenCreateLastContactPage}
        onUpdate={handleOpenUpdateLastContactPage}
        onOpenContactPage={handleOpenContactPage}
        isAuthorEntity={isAuthorEntity}
      />
    </Component>
  );
};

export default Acitivty;
