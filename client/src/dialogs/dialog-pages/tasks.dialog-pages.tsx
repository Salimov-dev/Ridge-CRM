import { Dispatch, FC, SetStateAction } from "react";
// components
import DialogStyled from "@components/common/dialog/dialog-styled";
import UpdateManagerTask from "@components/pages/task/update-manager-task";
import CreateMyTask from "@components/pages/task/create-my-task";
import UpdateTask from "@components/pages/task/update-task";
import CreateManagerTask from "@components/pages/task/create-manager-task";
// dialogs;
import tasksDialogsState from "@dialogs/dialog-handlers/tasks.dialog-handlers";
// interfaces
import { IDialogPagesState } from "@interfaces/state/dialog-pages-state.interface";

interface TasksDialogPagesProps {
  state: IDialogPagesState;
  setState: Dispatch<SetStateAction<IDialogPagesState>>;
}

const TasksDialogPages: FC<TasksDialogPagesProps> = ({ state, setState }) => {
  const {
    handleCloseCreateMyTaskPage,
    handleCloseUpdateMyTaskPage,
    handleCloseCreateManagerTaskPage,
    handleCloseUpdateManagerTaskPage
  } = tasksDialogsState({ setState });

  return (
    <>
      <DialogStyled
        component={
          <CreateMyTask state={state} onClose={handleCloseCreateMyTaskPage} />
        }
        maxWidth="sm"
        onClose={handleCloseCreateMyTaskPage}
        open={state.createMyTaskPage}
      />
      <DialogStyled
        component={
          <UpdateTask state={state} onClose={handleCloseUpdateMyTaskPage} />
        }
        onClose={handleCloseUpdateMyTaskPage}
        open={state.updateMyTaskPage}
        maxWidth="sm"
      />
      <DialogStyled
        component={
          <CreateManagerTask
            state={state}
            onClose={handleCloseCreateManagerTaskPage}
          />
        }
        onClose={handleCloseCreateManagerTaskPage}
        open={state.createManagerTaskPage}
        maxWidth="sm"
      />
      <DialogStyled
        component={
          <UpdateManagerTask
            state={state}
            onClose={handleCloseUpdateManagerTaskPage}
          />
        }
        onClose={handleCloseUpdateManagerTaskPage}
        open={state.updateManagerTaskPage}
        maxWidth="sm"
      />
    </>
  );
};

export default TasksDialogPages;
