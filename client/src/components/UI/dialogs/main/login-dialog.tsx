import { useDispatch, useSelector } from "react-redux";
import DialogStyled from "../../../common/dialog/dialog-styled";
import Login from "../../../pages/user/login";
import {
  getLoginOpenState,
  setLoginOpenState,
} from "../../../../store/auth/login.store";

const LoginDialog = () => {
  const dispatch = useDispatch();
  const isOpenLogin = useSelector(getLoginOpenState());

  const handleCloseLogin = () => {
    dispatch<any>(setLoginOpenState(false));
  };

  return (
    <DialogStyled
      component={<Login onClose={handleCloseLogin} />}
      maxWidth="sm"
      fullWidth={false}
      onClose={handleCloseLogin}
      open={isOpenLogin}
    />
  );
};

export default LoginDialog;
