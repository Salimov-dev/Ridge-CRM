import MeetingUpdateDialog from "../../../../components/UI/dialogs/meetings/meeting-update-dialog";
import ObjectPageDialog from "../../../../components/UI/dialogs/object-page-dialog/object-page-dialog";
import ObjectUpdatePageDialog from "../../../../components/UI/dialogs/objects/object-update-page-dialog";
import ManagerTaskUpdateDialog from "../../../../components/UI/dialogs/tasks/manager-task-update-dialog";
import MyTaskUpdateDialog from "../../../../components/UI/dialogs/tasks/my-task-update-dialog";
import MeetingCreateDialog from "../../../../components/UI/dialogs/meetings/meeting-create-dialog";
import MyTaskCreateDialog from "../../../../components/UI/dialogs/tasks/my-task-create-dialog";
import ManagerTaskCreateDialog from "../../../../components/UI/dialogs/tasks/manager-task-create-dialog";
import getDateToday from "../../../../utils/date/get-date-today";

const Dialogs = ({ objects, users, dateCreate=getDateToday(), setDateCreate }) => {
  return (
    <>
      <ObjectUpdatePageDialog />
      <ObjectPageDialog />

      <ManagerTaskCreateDialog
        objects={objects}
        users={users}
        dateCreate={dateCreate}
        setDateCreate={setDateCreate}
      />
      <ManagerTaskUpdateDialog />

      <MyTaskCreateDialog
        objects={objects}
        dateCreate={dateCreate}
        setDateCreate={setDateCreate}
      />
      <MyTaskUpdateDialog />

      <MeetingCreateDialog
        dateCreate={dateCreate}
      />
      <MeetingUpdateDialog />
    </>
  );
};

export default Dialogs;
