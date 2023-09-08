import { useDispatch, useSelector } from "react-redux";
import DialogStyled from "../../../common/dialog/dialog-styled";
import UpdateMyTask from "../../../pages/update-my-task/update-my-task";
import {
  loadUpdateRidgeTaskOpenState,
  setUpdateRidgeTaskOpenState,
} from "../../../../store/ridge-task/update-ridge-task.store";
import UpdateRidgeTask from "../../../pages/update-ridge-task/update-ridge-task";

const RidgeTaskUpdateDialog = () => {
  const dispatch = useDispatch();
  const isOpenUpdateMyTask = useSelector(loadUpdateRidgeTaskOpenState());

  const handleCloseUpdateRidgeTask = () => {
    dispatch(setUpdateRidgeTaskOpenState(false));
  };

  return (
    <DialogStyled
      onClose={handleCloseUpdateRidgeTask}
      open={isOpenUpdateMyTask}
      maxWidth="sm"
      fullWidth={false}
      component={
        <UpdateRidgeTask
          title="Изменить задачу с грядки"
          onClose={handleCloseUpdateRidgeTask}
        />
      }
    />
  );
};

export default RidgeTaskUpdateDialog;
