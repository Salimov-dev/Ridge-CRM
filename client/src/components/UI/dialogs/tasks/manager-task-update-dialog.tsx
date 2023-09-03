import { useDispatch, useSelector } from "react-redux";
import DialogStyled from "../../../common/dialog/dialog-styled";
import { loadUpdateManagerTaskOpenState } from "../../../../store/task/update-manager-task.store";
import UpdateManagerTask from "../../../pages/update-manager-task/update-manager-task";
import { getObjectsList } from "../../../../store/object/objects.store";
import {
  getCurrentUserId,
  getUsersList,
} from "../../../../store/user/users.store";

const ManagerTaskUpdateDialog = () => {
  const objects = useSelector(getObjectsList());
  const users = useSelector(getUsersList());
  const currentUserId = useSelector(getCurrentUserId());
  const isOpenUpdateManagerTask = useSelector(loadUpdateManagerTaskOpenState());
  const dispatch = useDispatch();

  const usersWithoutCurrentUser = users.filter(
    (user) => user._id !== currentUserId
  );
  const currentUserObjects = objects?.filter(
    (obj) => obj?.userId === currentUserId
  );

  let transformUsers = [];
  usersWithoutCurrentUser?.forEach((user) => {
    transformUsers?.push({
      _id: user._id,
      name: `${user.name.lastName} ${user.name.firstName}`,
    });
  });

  let transformObjects = [];
  currentUserObjects?.forEach((obj) => {
    transformObjects?.push({ _id: obj._id, name: obj.location.address });
  });

  const handleCloseUpdateManagerTask = () => {
    dispatch(setUpdateManagerTaskOpenState(false));
  };

  return (
    <DialogStyled
      onClose={handleCloseUpdateManagerTask}
      open={isOpenUpdateManagerTask}
      maxWidth="sm"
      fullWidth={false}
      component={
        <UpdateManagerTask
          title="Изменить задачу менеджеру"
          objects={transformObjects}
          users={transformUsers}
          onClose={handleCloseUpdateManagerTask}
        />
      }
    />
  );
};

export default ManagerTaskUpdateDialog;
