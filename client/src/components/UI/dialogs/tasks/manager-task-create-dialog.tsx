import { useDispatch, useSelector } from "react-redux";
import DialogStyled from "../../../common/dialog/dialog-styled";
import CreateManagerTask from "../../../pages/create-manager-task/create-manager-task";
import {
  getCreateManagerTaskOpenState,
  setCreateManagerTaskOpenState,
} from "../../../../store/task/create-manager-task.store";
import { getOpenObjectPageId, loadOpenObjectPageOpenState } from "../../../../store/object/open-object-page.store";
import React from "react";

const ManagerTaskCreateDialog = React.memo(({
  users,
  setDateCreate=()=>{},
  dateCreate=null,
}) => {
  const dispatch = useDispatch();
  const isOpenCreateTask = useSelector(getCreateManagerTaskOpenState());
  const objectPageId = useSelector(getOpenObjectPageId())
  const isObjectPage = useSelector(loadOpenObjectPageOpenState())

  const handleCloseCreateMyTask = () => {
    dispatch<any>(setCreateManagerTaskOpenState(false));
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
          objectPageId={objectPageId}
          users={users}
          dateCreate={dateCreate}
          onClose={handleCloseCreateMyTask}
          isObjectPage={isObjectPage}
        />
      }
    />
  );
});

export default ManagerTaskCreateDialog;
