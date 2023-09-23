import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// objects
import { loadObjectsList } from "../store/object/objects.store";
import { loadObjectStatusList } from "../store/object/object-status.store";
import { loadObjectTypesList } from "../store/object/object-types.store";
// objects params
import { loadMetroList } from "../store/object/metro.store";
import { loadDistrictsList } from "../store/object/districts.store";
import { loadWorkingPositionList } from "../store/user/working-position.store";
import { loadCurrentRentersList } from "../store/object/current-renter.store";
import { loadObjectConditionsList } from "../store/object/object-conditions.store";
import { loadRentTypesList } from "../store/object/rent-types.store";
import { loadEstateTypesList } from "../store/object/estate-types.store";
// meetings
import { loadMeetingsList } from "../store/meeting/meetings.store";
import { loadMeetingStatusesList } from "../store/meeting/meeting-status.store";
import { loadMeetingTypesList } from "../store/meeting/meeting-types.store";
// users
import { getIsLoggedIn, loadUsersList } from "../store/user/users.store";
import { loadUserStatusesList } from "../store/user/user-statuses.store";
// tasks
import { loadTasksList } from "../store/task/tasks.store";
// ridge tasks
import { loadRidgeTasksList } from "../store/ridge-task/ridge-tasks.store";
// ridge objects
import { loadRidgeObjectsList } from "../store/ridge-object/ridge-objects.store";
import { loadRidgeObjectStatusList } from "../store/ridge-object/ridge-object-status.store";
// last contact
import { loadLastContactsList } from "../store/last-contact/last-contact.store";
// ridge last contact
import { loadRidgeLastContactsList } from "../store/ridge-last-contact/last-ridge-contact.store";
// sidebar collaps
import { loadSidebarCollapsState } from "../store/sidebar-collaps-state.store";
import { loadDealsList } from "../store/deal/deal.store";
import { loadDealStagesList } from "../store/deal/deal-stages.store";
import { loadAuthState } from "../store/user/auth.store";

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
      dispatch<any>(loadWorkingPositionList());
      dispatch<any>(loadCurrentRentersList());
      dispatch<any>(loadRentTypesList());
      dispatch<any>(loadEstateTypesList());
      // users
      dispatch<any>(loadUsersList());
      dispatch<any>(loadUserStatusesList());
      // meetings
      dispatch<any>(loadMeetingsList());
      dispatch<any>(loadMeetingStatusesList());
      dispatch<any>(loadMeetingTypesList());
      // tasks
      dispatch<any>(loadTasksList());
      // ridge tasks
      dispatch<any>(loadRidgeTasksList());
      // ridge objects
      dispatch<any>(loadRidgeObjectsList());
      dispatch<any>(loadRidgeObjectStatusList());
      // last contact
      dispatch<any>(loadLastContactsList());
      // ridge last contact
      dispatch<any>(loadRidgeLastContactsList());
      // sidebar collaps
      dispatch<any>(loadSidebarCollapsState());
      // deals
      dispatch<any>(loadDealStagesList());
      dispatch<any>(loadDealsList());
    } else {
      dispatch<any>(loadAuthState(false));
    }
  }, [isLoggedIn]);

  return children;
};

export default AppLoader;
