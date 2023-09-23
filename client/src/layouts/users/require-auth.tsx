// Librares
import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
// Store
import { getAuthState } from "../../store/user/auth.store";

const RequireAuth = ({ children }) => {
  const location = useLocation();
  const isAuth = useSelector(getAuthState());

  if (!isAuth) {
    return <Navigate to="/auth/login" state={{ path: location.pathname }} />;
  }

  return children;
};

export default RequireAuth;
