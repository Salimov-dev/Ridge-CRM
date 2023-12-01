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
import CreateLastContactButton from "../../../UI/dialogs/buttons/create-last-contact-button";
import CreateTasksButtons from "../../../../layouts/calendar/components/create-tasks-buttons/create-tasks-buttons";
// store
import { getLastContactsList } from "../../../../store/last-contact/last-contact.store";
import { getObjectsList } from "../../../../store/object/objects.store";
import { getObjectMeetingsList } from "../../../../store/meeting/meetings.store";
import { getObjectTasksList } from "../../../../store/task/tasks.store";
import {
  getCurrentUserId,
  getIsUserCurator,
  getUsersList,
} from "../../../../store/user/users.store";
// columns
import { tasksColumnsDialog } from "../../../../columns/tasks-columns/tasks-columns-dialog";
// utils
import transformObjectsForSelect from "../../../../utils/objects/transform-objects-for-select";
import transformUsersForSelect from "../../../../utils/objects/transform-users-for-select";
import sortingByDateAndTime from "../../../../utils/other/sorting-by-date-and-time";

const Component = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 20px;
`;

const ObjectInfo = ({ object, isLoading, isAuthorEntity = true }) => {
  const objects = useSelector(getObjectsList());
  const objectId = object?._id;

  const meetings = useSelector(getObjectMeetingsList(objectId));
  const sortedMeetings = sortingByDateAndTime(meetings);

  const tasks = useSelector(getObjectTasksList(object?._id));
  const sortedTasks = sortingByDateAndTime(tasks);

  const lastContactsList = useSelector(getLastContactsList());
  const lastContacts = lastContactsList?.filter(
    (contact) => contact.objectId === objectId
  );
  const sortedLastContacts = lastContacts.reverse();

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

  return !isLoading ? (
    <Component>
      <ObjectsParams object={object} isLoading={isLoading} />
      <ObjectTasks
        columns={tasksColumnsDialog}
        tasks={sortedTasks}
        object={object}
        buttons={<CreateTasksButtons isAuthorEntity={isAuthorEntity} />}
      />
      <ObjectMeetings
        meetings={sortedMeetings}
        object={object}
        isAuthorEntity={isAuthorEntity}
      />
      <LastContacts
        lastContacts={sortedLastContacts}
        object={object}
        buttons={
          <CreateLastContactButton
            title="Добавить последний контакт"
            isAuthorEntity={isAuthorEntity}
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
