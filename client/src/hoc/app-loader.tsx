import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// objects
import { loadObjectsList } from "@store/object/objects.store";
import { loadObjectStatusList } from "@store/object-params/object-status.store";
import { loadObjectTypesList } from "@store/object-params/object-types.store";
// objects params
import { loadMetroList } from "@store/object-params/object-metro.store";
import { loadDistrictsList } from "@store/object-params/object-districts.store";
import { loadCurrentRentersList } from "@store/object-params/object-current-renter.store";
import { loadObjectConditionsList } from "@store/object-params/object-conditions.store";
import { loadRentTypesList } from "@store/object-params/object-rent-types.store";
import { loadEstateTypesList } from "@store/object-params/object-estate-types.store";
import { loadObjectPropertiesList } from "@store/object-params/object-properties";
import { loadTradeAreaList } from "@store/object-params/object-trade-area";
import { loadCitiesList } from "@store/city/citites.store";
// meetings
import { loadMeetingsList } from "@store/meeting/meetings.store";
import { loadMeetingStatusesList } from "@store/meeting/meeting-status.store";
import { loadMeetingTypesList } from "@store/meeting/meeting-types.store";
// users
import {
  getCurrentUserId,
  getIsLoggedIn,
  loadUsersList
} from "@store/user/users.store";
import { loadUserStatusesList } from "@store/user-params/user-statuses.store";
// license
import {
  getUserLicensesByUserId,
  loadUserLicensesList
} from "@store/license/user-license.store";
// company
import { loadCompaniesList } from "@store/company/company.store";
// tasks
import { loadTasksList } from "@store/task/tasks.store";
// last contact
import { loadLastContactsList } from "@store/last-contact/last-contact.store";
// presentation
import { loadPresentationsList } from "@store/presentation/presentations.store";
import { loadPresentationStatusList } from "@store/presentation/presentation-status.store";
// avatar
import { loadAvatarList } from "@store/avatar/avatar.store";
import { loadUserRolesList } from "@store/user-params/user-role.store";
// contact
import { loadContactsList } from "@store/contact/contact.store";
import { loadContactPositionsList } from "@store/contact/contact-positions.store";
import { licenseTypeBlockedId } from "@data/license/user-license-statuses";

interface AppLoaderProps {
  children: React.ReactNode;
}

const AppLoader = ({ children }: AppLoaderProps) => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(getIsLoggedIn());
  const currentUserId = useSelector(getCurrentUserId());
  const currentUserLicenseData = useSelector(
    getUserLicensesByUserId(currentUserId)
  );

  const currentLicenseTypeId = currentUserLicenseData?.accountType;
  const isLicenseBlockedType = currentLicenseTypeId === licenseTypeBlockedId;

  useEffect(() => {
    // cities
    dispatch<any>(loadCitiesList());
    if (isLoggedIn && !isLicenseBlockedType) {
      // objects
      dispatch<any>(loadObjectsList());
      dispatch<any>(loadObjectStatusList());
      dispatch<any>(loadObjectConditionsList());
      dispatch<any>(loadObjectTypesList());
      // objects params
      dispatch<any>(loadMetroList());
      dispatch<any>(loadDistrictsList());
      dispatch<any>(loadCurrentRentersList());
      dispatch<any>(loadRentTypesList());
      dispatch<any>(loadEstateTypesList());
      dispatch<any>(loadObjectPropertiesList());
      dispatch<any>(loadTradeAreaList());
      // users
      dispatch<any>(loadUsersList());
      dispatch<any>(loadUserStatusesList());
      dispatch<any>(loadUserLicensesList());
      dispatch<any>(loadUserRolesList());
      // meetings
      dispatch<any>(loadMeetingsList());
      dispatch<any>(loadMeetingStatusesList());
      dispatch<any>(loadMeetingTypesList());
      // tasks
      dispatch<any>(loadTasksList());
      // last contact
      dispatch<any>(loadLastContactsList());
      // presentations
      dispatch<any>(loadPresentationsList());
      dispatch<any>(loadPresentationStatusList());
      //avatar
      dispatch<any>(loadAvatarList());
      // companies
      dispatch<any>(loadCompaniesList());
      // contacts
      dispatch<any>(loadContactsList());
      dispatch<any>(loadContactPositionsList());
    }
  }, [isLoggedIn, dispatch, isLicenseBlockedType]);

  return children;
};

export default AppLoader;
