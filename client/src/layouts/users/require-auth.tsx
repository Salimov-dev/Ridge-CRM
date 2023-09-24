// Librares
import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
// Store
import { getIsLoggedIn } from "../../store/user/users.store";

const RequireAuth = ({ children }) => {
  const location = useLocation();

  const isLoggedIn = useSelector(getIsLoggedIn());

  if (!isLoggedIn) {
    return <Navigate to="/auth/login" state={{ path: location.pathname }} />;
  }

  return children;
};

export default RequireAuth;
