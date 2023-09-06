import MeetingCreateDialog from "../../../../UI/dialogs/meetings/meeting-create-dialog";
import MeetingUpdateDialog from "../../../../UI/dialogs/meetings/meeting-update-dialog";
import ManagerTaskCreateDialog from "../../../../UI/dialogs/tasks/manager-task-create-dialog";
import ManagerTaskUpdateDialog from "../../../../UI/dialogs/tasks/manager-task-update-dialog";
import MyTaskCreateDialog from "../../../../UI/dialogs/tasks/my-task-create-dialog";
import MyTaskUpdateDialog from "../../../../UI/dialogs/tasks/my-task-update-dialog";

const Dialogs = ({ objects, users }) => {
  return (
    <>
      <ManagerTaskCreateDialog objects={objects} users={users} />
      <ManagerTaskUpdateDialog />

      <MyTaskCreateDialog objects={objects} />
      <MyTaskUpdateDialog />

      <MeetingCreateDialog />
      <MeetingUpdateDialog />
    </>
  );
};

export default Dialogs;
