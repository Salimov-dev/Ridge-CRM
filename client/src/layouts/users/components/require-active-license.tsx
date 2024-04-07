// Librares
import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
// Store
import { getCurrentUserId } from "@store/user/users.store";
import { getUserLicensesByUserId } from "@store/user/user-license.store";
import { toast } from "react-toastify";

const RequireActiveLicense = ({ children }) => {
  const location = useLocation();

  const blockedLicenseTypeId = "71kbjld394u5jgfdsjk4l003";
  const currentUserId = useSelector(getCurrentUserId());
  const userLicense = useSelector(getUserLicensesByUserId(currentUserId));
  const currentLicenseTypeId = userLicense?.accountType;
  const isLicenseBlockedType = currentLicenseTypeId === blockedLicenseTypeId;

  if (isLicenseBlockedType) {
    toast.error("Доступ заблокирован, оплатите подписку");
    return <Navigate to="/users" />;
  }

  return children;
};

export default RequireActiveLicense;
