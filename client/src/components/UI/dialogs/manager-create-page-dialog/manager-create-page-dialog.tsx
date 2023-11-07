import { useDispatch, useSelector } from "react-redux";
import DialogStyled from "../../../common/dialog/dialog-styled";
import CreateManager from "../../../pages/create-manager/create-manager";
import {
  getCreateUserOpenState,
  setCreateUserOpenState,
} from "../../../../store/user/create-user.store";
import React from "react";

const ManagerCreatePageDialog = React.memo(() => {
  const isOpenCreateManager = useSelector(getCreateUserOpenState());
  const dispatch = useDispatch();

  const handleCloseCreateObject = () => {
    dispatch<any>(setCreateUserOpenState(false));
  };
  return (
    <DialogStyled
      component={<CreateManager onClose={handleCloseCreateObject} />}
      onClose={handleCloseCreateObject}
      open={isOpenCreateManager}
      maxWidth="xl"
    />
  );
});

export default ManagerCreatePageDialog;
