import { useDispatch, useSelector } from "react-redux";
import DialogStyled from "../../../common/dialog/dialog-styled";
import CreateRidgeTask from "../../../pages/create-ridge-task/create-ridge-task";
import {
  getCreateRidgeTaskOpenState,
  setCreateRidgeTaskOpenState,
} from "../../../../store/ridge-task/create-ridge-task.store";

const RidgeTaskCreateDialog = ({ objects, dateCreate, setDateCreate }) => {
  const dispatch = useDispatch();

  const isOpenCreateTask = useSelector(getCreateRidgeTaskOpenState());

  const handleCloseCreateMyTask = () => {
    dispatch(setCreateRidgeTaskOpenState(false));
    if (setDateCreate !== undefined) {
      setDateCreate(null);
    }
  };

  return (
    <DialogStyled
      onClose={handleCloseCreateMyTask}
      open={isOpenCreateTask}
      maxWidth="sm"
      fullWidth={false}
      component={
        <CreateRidgeTask
          title="Добавить себе задачу"
          objects={objects}
          dateCreate={dateCreate}
          onClose={handleCloseCreateMyTask}
        />
      }
    />
  );
};

export default RidgeTaskCreateDialog;
