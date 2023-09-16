import { useDispatch, useSelector } from "react-redux";
import DialogStyled from "../../../common/dialog/dialog-styled";
import CreateMyTask from "../../../pages/create-my-task/create-my-task";
import {
  getCreateMyTaskOpenState,
  setCreateMyTaskOpenState,
} from "../../../../store/task/create-my-task.store";
import { getOpenObjectPageId, loadOpenObjectPageOpenState } from "../../../../store/object/open-object-page.store";

const MyTaskCreateDialog = ({ dateCreate, objects, setDateCreate }) => {
  const dispatch = useDispatch();
  const isOpenCreateTask = useSelector(getCreateMyTaskOpenState());
  const objectPageId = useSelector(getOpenObjectPageId())
  const isObjectPage = useSelector(loadOpenObjectPageOpenState())

  const handleCloseCreateMyTask = () => {
    dispatch(setCreateMyTaskOpenState(false));
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
        <CreateMyTask
          title="Добавить себе задачу"
          objectPageId={objectPageId}
          isObjectPage={isObjectPage}
          objects={objects}
          dateCreate={dateCreate}
          onClose={handleCloseCreateMyTask}
        />
      }
    />
  );
};

export default MyTaskCreateDialog;
