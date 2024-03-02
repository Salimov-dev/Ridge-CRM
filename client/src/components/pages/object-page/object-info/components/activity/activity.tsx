import { tasksColumns } from "@columns/tasks.columns";
import LastContacts from "../last-contacts";
import ObjectMeetings from "../object-meetings";
import ObjectTasks from "../object-tasks";
import useObjectInfo from "@hooks/object-info/use-object-info.hook";
import { useSelector } from "react-redux";
import { meetingsColumns } from "@columns/meetings.columns";
import {
  getCurrentUserId,
  getIsUserAuthorThisEntity,
  getIsUserCurator
} from "@store/user/users.store";

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

  return (
    <>
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
    </>
  );
};

export default Acitivty;
