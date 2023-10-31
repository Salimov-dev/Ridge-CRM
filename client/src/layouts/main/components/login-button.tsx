import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  getLoginOpenState,
  setLoginOpenState,
} from "../../../store/user/login.store";

const LoginButton = () => {
  const isLoading = useSelector(getLoginOpenState());
  const dispatch = useDispatch();

  const handleOpenLogin = () => {
    dispatch<any>(setLoginOpenState(true));
  };

  return (
    <Button
      variant="contained"
      color="success"
      onClick={handleOpenLogin}
      disabled={isLoading}
      sx={{
        color: "white",
        background: "Red",
        "&:hover": { background: "Crimson" },
      }}
    >
      Войти
    </Button>
  );
};

export default LoginButton;
