// Librares
import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
// Store
import {
  getIsCurrentUserRoleCurator,
  getUsersLoadingStatus
} from "@store/user/users.store";

const RequireUserRoleCurator = ({ children }) => {
  const location = useLocation();

  const isLoading = useSelector(getUsersLoadingStatus());
  const isUserRoleCurator = useSelector(getIsCurrentUserRoleCurator());

  if (!isLoading && !isUserRoleCurator) {
    return <Navigate to="/" state={{ path: location.pathname }} />;
  }

  return children;
};

export default RequireUserRoleCurator;
