import { useDispatch, useSelector } from "react-redux";
import DialogStyled from "../../../common/dialog/dialog-styled";
import UpdateManager from "../../../pages/update-manager/update-manager";
import {
  getUpdateManagerOpenState,
  setUpdateManagerOpenState,
} from "../../../../store/user/update-user.store";
import React from "react";

const ManagerUpdatePageDialog = React.memo(() => {
  const isOpenCreateManager = useSelector(getUpdateManagerOpenState());
  const dispatch = useDispatch();

  const handleCloseCreateUser = () => {
    dispatch<any>(setUpdateManagerOpenState(false));
  };

  return (
    <DialogStyled
      component={<UpdateManager onClose={handleCloseCreateUser} />}
      onClose={handleCloseCreateUser}
      open={isOpenCreateManager}
      maxWidth="xl"
    />
  );
});

export default ManagerUpdatePageDialog;
