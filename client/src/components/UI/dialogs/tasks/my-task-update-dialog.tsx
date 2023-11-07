import { useDispatch, useSelector } from "react-redux";
import DialogStyled from "../../../common/dialog/dialog-styled";
import UpdateMyTask from "../../../pages/update-my-task/update-my-task";
import {
  loadUpdateMyTaskOpenState,
  setUpdateMyTaskOpenState,
} from "../../../../store/task/update-my-task.store";
import React from "react";

const MyTaskUpdateDialog = React.memo(() => {
  const dispatch = useDispatch();
  const isOpenUpdateMyTask = useSelector(loadUpdateMyTaskOpenState());

  const handleCloseUpdateMyTask = () => {
    dispatch<any>(setUpdateMyTaskOpenState(false));
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
});

export default MyTaskUpdateDialog;
