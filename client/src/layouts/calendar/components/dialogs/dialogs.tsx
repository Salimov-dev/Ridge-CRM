import { useSelector } from "react-redux";
// components
import MyTaskUpdateDialog from "../../../../components/UI/dialogs/tasks/my-task-update-dialog";
import MyTaskCreateDialog from "../../../../components/UI/dialogs/tasks/my-task-create-dialog";
import MeetingUpdateDialog from "../../../../components/UI/dialogs/meetings/meeting-update-dialog";
import MeetingCreateDialog from "../../../../components/UI/dialogs/meetings/meeting-create-dialog";
import ObjectPageDialog from "../../../../components/UI/dialogs/object-page-dialog/object-page-dialog";
import ObjectUpdatePageDialog from "../../../../components/UI/dialogs/objects/object-update-page-dialog";
import ManagerTaskUpdateDialog from "../../../../components/UI/dialogs/tasks/manager-task-update-dialog";
import ManagerTaskCreateDialog from "../../../../components/UI/dialogs/tasks/manager-task-create-dialog";
import OpenSelectedDayDialog from "../../../../components/UI/dialogs/calendar/open-selected-day-dialog";
// utils
import getDateToday from "../../../../utils/date/get-date-today";
// store
import {
  getOpenObjectPageId,
  loadOpenObjectPageOpenState,
} from "../../../../store/object/open-object-page.store";

const Dialogs = ({
  tasks,
  meetings,
  objects,
  users,
  dateCreate = getDateToday(),
  setDateCreate,
}) => {
  const objectPageId = useSelector(getOpenObjectPageId());
  const isObjectPage = useSelector(loadOpenObjectPageOpenState());

  return (
    <>
      <ObjectUpdatePageDialog />
      <ObjectPageDialog />

      <ManagerTaskCreateDialog
        users={users}
        dateCreate={dateCreate}
        setDateCreate={setDateCreate}
      />
      <ManagerTaskUpdateDialog objects={objects} />

      <MyTaskCreateDialog
        objects={objects}
        dateCreate={dateCreate}
        setDateCreate={setDateCreate}
        objectPageId={objectPageId}
        isObjectPage={isObjectPage}
      />
      <MyTaskUpdateDialog />

      <MeetingCreateDialog
        objectPageId={objectPageId}
        isObjectPage={isObjectPage}
        dateCreate={dateCreate}
      />
      <MeetingUpdateDialog />

      <OpenSelectedDayDialog
        dateCreate={dateCreate}
        tasks={tasks}
        meetings={meetings}
      />
    </>
  );
};

export default Dialogs;
