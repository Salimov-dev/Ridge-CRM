import { useDispatch, useSelector } from "react-redux";
import DialogStyled from "../../../common/dialog/dialog-styled";
import UpdateMyTask from "../../../pages/update-my-task/update-my-task";
import {
  loadupdateMyTaskOpenState,
  setupdateMyTaskOpenState,
} from "../../../../store/task/update-my-task.store";

const MyTaskUpdateDialog = () => {
  const dispatch = useDispatch();
  const isOpenUpdateMyTask = useSelector(loadupdateMyTaskOpenState());

  const handleCloseUpdateMyTask = () => {
    dispatch(setupdateMyTaskOpenState(false));
  };

  return (
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
  );
};

export default MyTaskUpdateDialog;
