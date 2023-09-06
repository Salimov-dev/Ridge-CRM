import MeetingUpdateDialog from "../../../../UI/dialogs/meetings/meeting-update-dialog";
import ObjectUpdatePageDialog from "../../../../UI/dialogs/objects/object-update-page-dialog";
import ManagerTaskUpdateDialog from "../../../../UI/dialogs/tasks/manager-task-update-dialog";
import MyTaskUpdateDialog from "../../../../UI/dialogs/tasks/my-task-update-dialog";
import DialogStyled from "../../../../common/dialog/dialog-styled";
import CreateManagerTask from "../../../create-manager-task/create-manager-task";
import CreateMeeting from "../../../create-meeting/create-meeting";
import CreateMyTask from "../../../create-my-task/create-my-task";

const Dialogs = ({
  object,
  objects,
  users,
  openCreateMyTask,
  openCreateManagerTask,
  openCreateMeeting,
  dateCreateMyTask,
  handleCloseCreateMeeting,
  handleCloseCreateManagerTask,
  handleCloseCreateMyTask,
}) => {
  const objectId = object?._id;
  return (
    <>
      <ObjectUpdatePageDialog />

      <MeetingUpdateDialog />
      <DialogStyled
        component={
          <CreateMeeting
            onClose={handleCloseCreateMeeting}
            objectPageId={objectId}
          />
        }
        onClose={handleCloseCreateMeeting}
        open={openCreateMeeting}
      />

      <ManagerTaskUpdateDialog />
      <DialogStyled
        onClose={handleCloseCreateManagerTask}
        open={openCreateManagerTask}
        maxWidth="sm"
        fullWidth={false}
        component={
          <CreateManagerTask
            title="Добавить менеджеру задачу"
            objectPageId={objectId}
            objects={objects}
            users={users}
            onClose={handleCloseCreateManagerTask}
          />
        }
      />

      <MyTaskUpdateDialog />
      <DialogStyled
        onClose={handleCloseCreateMyTask}
        open={openCreateMyTask}
        maxWidth="sm"
        fullWidth={false}
        component={
          <CreateMyTask
            title="Добавить себе задачу"
            date={dateCreateMyTask}
            objectPageId={objectId}
            objects={objects}
            onClose={handleCloseCreateMyTask}
          />
        }
      />
    </>
  );
};

export default Dialogs;
