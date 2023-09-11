import { useDispatch, useSelector } from "react-redux";
import DialogStyled from "../../../common/dialog/dialog-styled";
import CreateRidgeTask from "../../../pages/create-ridge-task/create-ridge-task";
import {
  getCreateRidgeTaskOpenState,
  setCreateRidgeTaskOpenState,
} from "../../../../store/ridge-task/create-ridge-task.store";
import { getUpdateRidgeObjectId } from "../../../../store/ridge-object/update-ridge-object.store";

const RidgeTaskCreateDialog = ({ objects, dateCreate, setDateCreate }) => {
  const dispatch = useDispatch();

  const isOpenCreateTask = useSelector(getCreateRidgeTaskOpenState());
  const objectPageId = useSelector(getUpdateRidgeObjectId());

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
          title="Поставить задачу из грядки"
          objects={objects}
          objectPageId={objectPageId}
          dateCreate={dateCreate}
          onClose={handleCloseCreateMyTask}
        />
      }
    />
  );
};

export default RidgeTaskCreateDialog;
