import DialogStyled from "../../../../common/dialog/dialog-styled";
import CreateManagerTask from "../../../create-manager-task/create-manager-task";
import CreateMeeting from "../../../create-meeting/create-meeting";
import CreateMyTask from "../../../create-my-task/create-my-task";
import UpdateManagerTask from "../../../update-manager-task/update-manager-task";
import UpdateMeeting from "../../../update-meeting/update-meeting";
import UpdateMyTask from "../../../update-my-task/update-my-task";

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
  handleCloseUpdateMeeting,
  handleCloseUpdateMyTask,
  handleCloseUpdateManagerTask,
  isOpenUpdateManagerTask,
  isOpenUpdateMyTask,
  isOpenUpdateMeeting,
}) => {
  const objectId = object._id;
  return (
    <>
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
      <DialogStyled
        component={<UpdateMeeting onClose={handleCloseUpdateMeeting} />}
        onClose={handleCloseUpdateMeeting}
        open={isOpenUpdateMeeting}
        fullWidth={false}
      />
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
      <DialogStyled
        onClose={handleCloseUpdateMyTask}
        open={isOpenUpdateMyTask}
        maxWidth="sm"
        fullWidth={false}
        component={
          <UpdateMyTask
            title="Изменить свою задачу"
            onClose={handleCloseUpdateMyTask}
          />
        }
      />
      <DialogStyled
        onClose={handleCloseUpdateManagerTask}
        open={isOpenUpdateManagerTask}
        maxWidth="sm"
        fullWidth={false}
        component={
          <UpdateManagerTask
            title="Изменить задачу менеджеру"
            objects={objects}
            users={users}
            onClose={handleCloseUpdateManagerTask}
          />
        }
      />
    </>
  );
};

export default Dialogs;
