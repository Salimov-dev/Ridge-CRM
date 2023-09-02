import DialogStyled from "../../../../components/common/dialog/dialog-styled";
import CreateManagerTask from "../../../../components/pages/create-manager-task/create-manager-task";
import CreateMeeting from "../../../../components/pages/create-meeting/create-meeting";
import CreateMyTask from "../../../../components/pages/create-my-task/create-my-task";
import UpdateManagerTask from "../../../../components/pages/update-manager-task/update-manager-task";
import UpdateMeeting from "../../../../components/pages/update-meeting/update-meeting";
import UpdateMyTask from "../../../../components/pages/update-my-task/update-my-task";

const Dialogs = ({
  objects,
  users,
  dateCreateMyTask,
  openCreateMyTask,
  openCreateManagerTask,
  openCreateMeeting,
  handleCloseCreateMyTask,
  handleCloseCreateManagerTask,
  handleCloseCreateMeeting,
  handleCloseUpdateMeeting,
  handleCloseUpdateMyTask,
  handleCloseUpdateManagerTask,
  isOpenUpdateManagerTask,
  isOpenUpdateMyTask,
  isOpenUpdateMeeting,
}) => {
  return (
    <>
      <DialogStyled
        component={<CreateMeeting onClose={handleCloseCreateMeeting} />}
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
        maxWidth="lg"
        fullWidth={false}
        component={
          <CreateManagerTask
            title="Поставить менеджеру задачу"
            objects={objects}
            users={users}
            onClose={handleCloseCreateManagerTask}
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
      <DialogStyled
        onClose={handleCloseCreateMyTask}
        open={openCreateMyTask}
        maxWidth="sm"
        fullWidth={false}
        component={
          <CreateMyTask
            title="Добавить себе задачу"
            objects={objects}
            date={dateCreateMyTask}
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
    </>
  );
};

export default Dialogs;
