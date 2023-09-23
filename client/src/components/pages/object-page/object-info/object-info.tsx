// libraries
import { Box, styled } from "@mui/material";
import { useSelector } from "react-redux";
import { orderBy } from "lodash";

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
import { getObjectsList } from "../../../../store/object/objects.store";
import { getObjectMeetingsList } from "../../../../store/meeting/meetings.store";
import { getObjectTasksList } from "../../../../store/task/tasks.store";
import {
  getCurrentUserId,
  getIsUserCurator,
  getUsersList,
} from "../../../../store/user/users.store";
import { getLastContactsByObjectId } from "../../../../store/last-contact/last-contact.store";
import { tasksColumnsDialog } from "../../../../columns/tasks-columns/tasks-columns-dialog";

const Component = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 20px;
`;

const ObjectInfo = ({ object, isLoading, isAuthorEntity = true }) => {
  const objects = useSelector(getObjectsList());
  const meetings = useSelector(getObjectMeetingsList(object?._id));
  const sortedMeetings = orderBy(meetings, ["date"], ["desc"]);

  const tasksColumns = tasksColumnsDialog;

  const tasks = useSelector(getObjectTasksList(object?._id));
  const sortedTasks = orderBy(tasks, ["date"], ["desc"]);

  const lastContacts = useSelector(getLastContactsByObjectId(object?._id));
  const sortedLastContacts = orderBy(lastContacts, ["date"], ["desc"]);

  const users = useSelector(getUsersList());
  const currentUserId = useSelector(getCurrentUserId());

  const isCurator = useSelector(getIsUserCurator(currentUserId));
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
  if (isCurator) {
    objects?.forEach((obj) => {
      transformObjects?.push({ _id: obj?._id, name: obj?.location.address });
    });
  } else {
    currentUserObjects?.forEach((obj) => {
      transformObjects?.push({ _id: obj?._id, name: obj?.location.address });
    });
  }

  return !isLoading ? (
    <Component>
      <ObjectsParams object={object} isLoading={isLoading} />
      <ObjectTasks
        columns={tasksColumns}
        tasks={sortedTasks}
        object={object}
        buttons={
          <CreateTasksButtons
            withoutMeeting={true}
            isAuthorEntity={isAuthorEntity}
          />
        }
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
