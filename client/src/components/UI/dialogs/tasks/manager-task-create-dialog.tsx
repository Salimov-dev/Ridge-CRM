import { useDispatch, useSelector } from "react-redux";
import DialogStyled from "../../../common/dialog/dialog-styled";
import CreateManagerTask from "../../../pages/create-manager-task/create-manager-task";
import {
  getCreateManagerTaskOpenState,
  setCreateManagerTaskOpenState,
} from "../../../../store/task/create-manager-task.store";
import { getOpenObjectPageId, loadOpenObjectPageOpenState } from "../../../../store/object/open-object-page.store";

const ManagerTaskCreateDialog = ({
  objects,
  users,
  setDateCreate,
  dateCreate,
}) => {
  const dispatch = useDispatch();
  const isOpenCreateTask = useSelector(getCreateManagerTaskOpenState());
  const objectPageId = useSelector(getOpenObjectPageId())
  const isObjectPage = useSelector(loadOpenObjectPageOpenState())

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
          objectPageId={objectPageId}
          users={users}
          dateCreate={dateCreate}
          onClose={handleCloseCreateMyTask}
          isObjectPage={isObjectPage}
        />
      }
    />
  );
};

export default ManagerTaskCreateDialog;
