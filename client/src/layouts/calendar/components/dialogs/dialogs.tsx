import MeetingUpdateDialog from "../../../../components/UI/dialogs/meetings/meeting-update-dialog";
import ObjectPageDialog from "../../../../components/UI/dialogs/object-page-dialog/object-page-dialog";
import ObjectUpdatePageDialog from "../../../../components/UI/dialogs/objects/object-update-page";
import ManagerTaskUpdateDialog from "../../../../components/UI/dialogs/tasks/manager-task-update-dialog";
import MyTaskUpdateDialog from "../../../../components/UI/dialogs/tasks/my-task-update-dialog";
import DialogStyled from "../../../../components/common/dialog/dialog-styled";
import CreateManagerTask from "../../../../components/pages/create-manager-task/create-manager-task";
import CreateMeeting from "../../../../components/pages/create-meeting/create-meeting";
import CreateMyTask from "../../../../components/pages/create-my-task/create-my-task";

const Dialogs = ({
  objects,
  users,
  dateCreateMyTask,
  openCreateMyTask,
  openCreateManagerTask,
  openCreateMeeting,
  onOpenCreateMyTask,
  onOpenCreateManagerTask,
  onCloseCreateMyTask,
  onCloseCreateManagerTask,
  onCloseCreateMeeting,
}) => {
  return (
    <>
      <ObjectUpdatePageDialog />
      <ObjectPageDialog />

      <ManagerTaskUpdateDialog />
      <DialogStyled
        onClose={onCloseCreateManagerTask}
        open={openCreateManagerTask}
        maxWidth="lg"
        fullWidth={false}
        component={
          <CreateManagerTask
            title="Поставить менеджеру задачу"
            objects={objects}
            users={users}
            onClose={onCloseCreateManagerTask}
            onOpenCreateMyTask={onOpenCreateMyTask}
          />
        }
      />
      
      <MyTaskUpdateDialog />
      <DialogStyled
        onClose={onCloseCreateMyTask}
        open={openCreateMyTask}
        maxWidth="sm"
        fullWidth={false}
        component={
          <CreateMyTask
            title="Добавить себе задачу"
            objects={objects}
            date={dateCreateMyTask}
            onClose={onCloseCreateMyTask}
            onOpenCreateManagerTask={onOpenCreateManagerTask}
          />
        }
      />

      <MeetingUpdateDialog />
      <DialogStyled
        component={<CreateMeeting onClose={onCloseCreateMeeting} />}
        onClose={onCloseCreateMeeting}
        open={openCreateMeeting}
      />

    </>
  );
};

export default Dialogs;
