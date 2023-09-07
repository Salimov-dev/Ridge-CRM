import { useDispatch, useSelector } from "react-redux";
import DialogStyled from "../../../common/dialog/dialog-styled";
import CreateManager from "../../../pages/create-manager/create-manager";
import {
  getCreateUserOpenState,
  setCreateUserOpenState,
} from "../../../../store/user/create-user.store";

const ManagerCreatePageDialog = () => {
  const isOpenCreateManager = useSelector(getCreateUserOpenState());
  const dispatch = useDispatch();

  const handleCloseCreateObject = () => {
    dispatch(setCreateUserOpenState(false));
  };
  return (
    <DialogStyled
      component={<CreateManager onClose={handleCloseCreateObject} />}
      onClose={handleCloseCreateObject}
      open={isOpenCreateManager}
      maxWidth="xl"
    />
  );
};

export default ManagerCreatePageDialog;
