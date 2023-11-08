import { useDispatch, useSelector } from "react-redux";
import DialogStyled from "../../../common/dialog/dialog-styled";
import CreateMyTask from "../../../pages/create-my-task/create-my-task";
import {
  getCreateMyTaskOpenState,
  setCreateMyTaskOpenState,
} from "../../../../store/task/create-my-task.store";
import React from "react";

const MyTaskCreateDialog = ({
  objects,
  dateCreate = null,
  setDateCreate = () => {},
  objectPageId,
  isObjectPage=false
}) => {
  const dispatch = useDispatch();
  const isOpenCreateTask = useSelector(getCreateMyTaskOpenState());

  const handleCloseCreateMyTask = () => {
    dispatch<any>(setCreateMyTaskOpenState(false));
    if (setDateCreate !== undefined) {
      setDateCreate();
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
