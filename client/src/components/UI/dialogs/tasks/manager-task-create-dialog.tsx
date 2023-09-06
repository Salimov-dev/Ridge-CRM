import { useDispatch, useSelector } from "react-redux";
import DialogStyled from "../../../common/dialog/dialog-styled";
import CreateManagerTask from "../../../pages/create-manager-task/create-manager-task";
import {
  getCreateManagerTaskOpenState,
  setCreateManagerTaskOpenState,
} from "../../../../store/task/create-manager-task.store";

const ManagerTaskCreateDialog = ({
  objects,
  users,
  setDateCreate,
  dateCreate,
}) => {
  const dispatch = useDispatch();

  const isOpenCreateTask = useSelector(getCreateManagerTaskOpenState());

  const handleCloseCreateMyTask = () => {
    dispatch(setCreateManagerTaskOpenState(false));
    if (setDateCreate !== undefined) {
      setDateCreate(null);
    }
  };

  return (
    <DialogStyled
      onClose={handleCloseCreateMyTask}
      open={isOpenCreateTask}
      maxWidth="lg"
      fullWidth={false}
      component={
        <CreateManagerTask
          title="Поставить менеджеру задачу"
          objects={objects}
          users={users}
          dateCreate={dateCreate}
          onClose={handleCloseCreateMyTask}
        />
      }
    />
  );
};

export default ManagerTaskCreateDialog;
