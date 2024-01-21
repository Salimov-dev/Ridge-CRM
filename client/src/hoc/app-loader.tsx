import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// objects
import { loadObjectsList } from "@store/object/objects.store";
import { loadObjectStatusList } from "@store/object-params/object-status.store";
import { loadObjectTypesList } from "@store/object-params/object-types.store";
// objects params
import { loadMetroList } from "@store/object-params/metro.store";
import { loadDistrictsList } from "@store/object-params/districts.store";
import { loadWorkingPositionList } from "@store/user-params/working-position.store";
import { loadCurrentRentersList } from "@store/object-params/current-renter.store";
import { loadObjectConditionsList } from "@store/object-params/object-conditions.store";
import { loadRentTypesList } from "@store/object-params/rent-types.store";
import { loadEstateTypesList } from "@store/object-params/estate-types.store";
import { loadObjectPropertiesList } from "@store/object-params/object-properties";
import { loadTradeAreaList } from "@store/object-params/object-trade-area";
// meetings
import { loadMeetingsList } from "@store/meeting/meetings.store";
import { loadMeetingStatusesList } from "@store/meeting/meeting-status.store";
import { loadMeetingTypesList } from "@store/meeting/meeting-types.store";
// users
import { getIsLoggedIn, loadUsersList } from "@store/user/users.store";
import { loadUserStatusesList } from "@store/user-params/user-statuses.store";
// tasks
import { loadTasksList } from "@store/task/tasks.store";
// last contact
import { loadLastContactsList } from "@store/last-contact/last-contact.store";
// presentation
import { loadPresentationsList } from "@store/presentation/presentations.store";
import { loadPresentationStatusList } from "@store/presentation/presentation-status.store";
// avatar
import { loadAvatarList } from "@store/avatar/avatar.store";

interface AppLoaderProps {
  children: React.ReactNode;
}

const AppLoader = ({ children }: AppLoaderProps) => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(getIsLoggedIn());

  useEffect(() => {
    if (isLoggedIn) {
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
      dispatch<any>(loadTradeAreaList());
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
      // presentations
      dispatch<any>(loadPresentationsList());
      dispatch<any>(loadPresentationStatusList());

      dispatch<any>(loadAvatarList());
    }
  }, [isLoggedIn, dispatch]);

  return children;
};

export default AppLoader;
