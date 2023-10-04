import { useSelector } from "react-redux";
import LastContactCreateDialog from "../../../../UI/dialogs/last-contacts/last-contact-create-dialog";
import LastContactUpdateDialog from "../../../../UI/dialogs/last-contacts/last-contact-update-dialog";
import MeetingCreateDialog from "../../../../UI/dialogs/meetings/meeting-create-dialog";
import MeetingUpdateDialog from "../../../../UI/dialogs/meetings/meeting-update-dialog";
import ManagerTaskCreateDialog from "../../../../UI/dialogs/tasks/manager-task-create-dialog";
import ManagerTaskUpdateDialog from "../../../../UI/dialogs/tasks/manager-task-update-dialog";
import MyTaskCreateDialog from "../../../../UI/dialogs/tasks/my-task-create-dialog";
import MyTaskUpdateDialog from "../../../../UI/dialogs/tasks/my-task-update-dialog";
import { getOpenObjectPageId, loadOpenObjectPageOpenState } from "../../../../../store/object/open-object-page.store";

const Dialogs = ({ objects, users }) => {
  const objectPageId = useSelector(getOpenObjectPageId());
  const isObjectPage = useSelector(loadOpenObjectPageOpenState());

  return (
    <>
      <ManagerTaskCreateDialog objects={objects} users={users} />
      <ManagerTaskUpdateDialog />

      <MyTaskCreateDialog objects={objects} objectPageId={objectPageId} isObjectPage={isObjectPage}/>
      <MyTaskUpdateDialog />

      <MeetingCreateDialog objectPageId={objectPageId} isObjectPage={isObjectPage}/>
      <MeetingUpdateDialog />

      <LastContactCreateDialog />
      <LastContactUpdateDialog />
    </>
  );
};

export default Dialogs;
