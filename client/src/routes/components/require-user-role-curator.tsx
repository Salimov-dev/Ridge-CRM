// Librares
import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
// Store
import { getIsCurrentUserRoleCurator } from "@store/user/users.store";

const RequireUserRoleCurator = ({ children }) => {
  const location = useLocation();

  const isUserRoleCurator = useSelector(getIsCurrentUserRoleCurator());

  if (!isUserRoleCurator) {
    return <Navigate to="/" state={{ path: location.pathname }} />;
  }

  return children;
};

export default RequireUserRoleCurator;
