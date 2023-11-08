import { useDispatch, useSelector } from "react-redux";
import DialogStyled from "../../../common/dialog/dialog-styled";
import UpdateManagerTask from "../../../pages/update-manager-task/update-manager-task";
import {
  loadUpdateManagerTaskOpenState,
  setUpdateManagerTaskOpenState,
} from "../../../../store/task/update-manager-task.store";
import {
  getCurrentUserId,
  getUsersList,
} from "../../../../store/user/users.store";
import transformUsersForSelect from "../../../../utils/objects/transform-users-for-select";
import React from "react";

const ManagerTaskUpdateDialog = ({ objects = [] }) => {
  const dispatch = useDispatch();
  const users = useSelector(getUsersList());
  const currentUserId = useSelector(getCurrentUserId());
  const isOpenUpdateManagerTask = useSelector(loadUpdateManagerTaskOpenState());

  const usersWithoutCurrentUser = users?.filter(
    (user) => user?._id !== currentUserId
  );

  const transformUsers = transformUsersForSelect(usersWithoutCurrentUser);

  const handleCloseUpdateManagerTask = () => {
    dispatch<any>(setUpdateManagerTaskOpenState(false));
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
          objects={objects}
          users={transformUsers}
          onClose={handleCloseUpdateManagerTask}
        />
      }
    />
  );
};

export default ManagerTaskUpdateDialog;
