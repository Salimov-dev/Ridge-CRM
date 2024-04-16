// Librares
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
// Store
import { getCurrentUserId } from "@store/user/users.store";
import { getUserLicensesByUserId } from "@store/license/user-license.store";
import { toast } from "react-toastify";
import { licenseTypeBlockedId } from "@data/license/user-license-statuses";

const RequireActiveLicense = ({ children }) => {
  const currentUserId = useSelector(getCurrentUserId());
  const userLicense = useSelector(getUserLicensesByUserId(currentUserId));

  const currentLicenseTypeId = userLicense?.accountType;
  const isLicenseBlockedType = currentLicenseTypeId === licenseTypeBlockedId;

  if (isLicenseBlockedType) {
    toast.error("Доступ заблокирован, оплатите подписку");
    return <Navigate to="/users" />;
  }

  return children;
};

export default RequireActiveLicense;
