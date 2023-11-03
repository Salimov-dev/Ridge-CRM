import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// auth
import { loadAuthState } from "../store/user/auth.store";
// objects
import { loadObjectsList } from "../store/object/objects.store";
import { loadObjectStatusList } from "../store/object-params/object-status.store";
import { loadObjectTypesList } from "../store/object-params/object-types.store";
// objects params
import { loadMetroList } from "../store/object-params/metro.store";
import { loadDistrictsList } from "../store/object-params/districts.store";
import { loadWorkingPositionList } from "../store/user/working-position.store";
import { loadCurrentRentersList } from "../store/object-params/current-renter.store";
import { loadObjectConditionsList } from "../store/object-params/object-conditions.store";
import { loadRentTypesList } from "../store/object-params/rent-types.store";
import { loadEstateTypesList } from "../store/object-params/estate-types.store";
import { loadObjectPropertiesList } from "../store/object-params/object-properties";
// meetings
import { loadMeetingsList } from "../store/meeting/meetings.store";
import { loadMeetingStatusesList } from "../store/meeting/meeting-status.store";
import { loadMeetingTypesList } from "../store/meeting/meeting-types.store";
// users
import { getIsLoggedIn, loadUsersList } from "../store/user/users.store";
import { loadUserStatusesList } from "../store/user/user-statuses.store";
// tasks
import { loadTasksList } from "../store/task/tasks.store";
// last contact
import { loadLastContactsList } from "../store/last-contact/last-contact.store";
// sidebar collaps
import { loadSidebarCollapsState } from "../store/sidebar-collaps-state.store";
// presentation
import { loadPresentationsList } from "../store/presentation/presentations.store";
import { loadPresentationStatusList } from "../store/presentation/presentation-status.store";

interface AppLoaderProps {
  children: React.ReactNode;
}

const AppLoader = ({ children }: AppLoaderProps) => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(getIsLoggedIn());

  useEffect(() => {
    if (isLoggedIn) {
      dispatch<any>(loadAuthState(true));
      // objects
      dispatch<any>(loadObjectsList());
      dispatch<any>(loadObjectStatusList());
      dispatch<any>(loadObjectConditionsList());
      dispatch<any>(loadObjectTypesList());
      // objects params
      dispatch<any>(loadMetroList());
      dispatch<any>(loadDistrictsList());
      dispatch<any>(loadWorkingPositionList());
      dispatch<any>(loadCurrentRentersList());
      dispatch<any>(loadRentTypesList());
      dispatch<any>(loadEstateTypesList());
      dispatch<any>(loadObjectPropertiesList());
      // users
      dispatch<any>(loadUsersList());
      dispatch<any>(loadUserStatusesList());
      // meetings
      dispatch<any>(loadMeetingsList());
      dispatch<any>(loadMeetingStatusesList());
      dispatch<any>(loadMeetingTypesList());
      // tasks
      dispatch<any>(loadTasksList());
      // last contact
      dispatch<any>(loadLastContactsList());
      // sidebar collaps
      dispatch<any>(loadSidebarCollapsState());
      // presentations
      dispatch<any>(loadPresentationsList());
      dispatch<any>(loadPresentationStatusList());
    } else {
      dispatch<any>(loadAuthState(false));
    }
  }, [isLoggedIn]);

  return children;
};

export default AppLoader;
