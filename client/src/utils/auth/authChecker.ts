import { useEffect } from "react";
import {
  isTokenExpired,
  removeAuthData,
} from "../../services/user/local.storage-service";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logOut } from "../../store/user/users.store";

function AuthChecker() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isTokenExpired()) {
      dispatch<any>(logOut());
      removeAuthData();
      navigate("/");
    }
  }, [navigate]);

  return null; 
}

export default AuthChecker;
