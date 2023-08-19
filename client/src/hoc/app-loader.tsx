import { useEffect } from "react";
import { useDispatch } from "react-redux";
// store
import { loadObjectsList } from "../store/objects.store";
import { loadUsersList } from "../store/users.store";
import { loadMetroList } from "../store/metro.store";
import { loadDistrictsList } from "../store/districts.store";
import { loadObjectStatusList } from "../store/object-status.store";
import { loadWorkingPositionList } from "../store/working-position.store";
import { loadSidebarCollapsState } from "../store/sidebar-collaps-state.store";
import { loadCurrentRentersList } from "../store/current-renter.store";
import { loadObjectConditionsList } from "../store/object-conditions.store";
import { loadRentTypesList } from "../store/rent-types.store";
import { loadObjectTypesList } from "../store/object-types.store";
import { loadEstateTypesList } from "../store/estate-types.store";
import { loadUserStatusesList } from "../store/user-statuses.store";
import { loadMeetingsList } from "../store/meetings.store";
import { loadMeetingStatusesList } from "../store/meeting-status.store";
import { loadMeetingTypesList } from "../store/meeting-types.store";

interface AppLoaderProps {
  children: React.ReactNode;
}

const AppLoader = ({ children }: AppLoaderProps) => {
  const dispatch = useDispatch();

  useEffect(() => {
    // objects
    dispatch<any>(loadObjectsList());
    dispatch<any>(loadObjectStatusList());
    dispatch<any>(loadObjectConditionsList());
    dispatch<any>(loadObjectTypesList());
    // users
    dispatch<any>(loadUsersList());
    dispatch<any>(loadUserStatusesList());
    // meetings
    dispatch<any>(loadMeetingsList());
    dispatch<any>(loadMeetingStatusesList());
    dispatch<any>(loadMeetingTypesList());
    // other objects params
    dispatch<any>(loadMetroList());
    dispatch<any>(loadDistrictsList());
    dispatch<any>(loadWorkingPositionList());
    dispatch<any>(loadWorkingPositionList());
    dispatch<any>(loadSidebarCollapsState());
    dispatch<any>(loadCurrentRentersList());
    dispatch<any>(loadRentTypesList());
    dispatch<any>(loadEstateTypesList());
  }, []);

  return children;
};

export default AppLoader;
