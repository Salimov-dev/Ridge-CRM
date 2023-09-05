import { useEffect } from "react";
import { useDispatch } from "react-redux";
// store
import { loadObjectsList } from "../store/object/objects.store";
import { loadObjectStatusList } from "../store/object/object-status.store";
import { loadObjectTypesList } from "../store/object/object-types.store";
import { loadUsersList } from "../store/user/users.store";
import { loadMetroList } from "../store/object/metro.store";
import { loadDistrictsList } from "../store/object/districts.store";
import { loadWorkingPositionList } from "../store/user/working-position.store";
import { loadSidebarCollapsState } from "../store/sidebar-collaps-state.store";
import { loadCurrentRentersList } from "../store/object/current-renter.store";
import { loadObjectConditionsList } from "../store/object/object-conditions.store";
import { loadRentTypesList } from "../store/object/rent-types.store";
import { loadEstateTypesList } from "../store/object/estate-types.store";
import { loadUserStatusesList } from "../store/user/user-statuses.store";
import { loadMeetingsList } from "../store/meeting/meetings.store";
import { loadMeetingStatusesList } from "../store/meeting/meeting-status.store";
import { loadMeetingTypesList } from "../store/meeting/meeting-types.store";
import { loadTasksList } from "../store/task/tasks.store";
import { loadRidgeObjectsList } from "../store/ridge/ridge-objects.store";
import { loadRidgeObjectStatusList } from "../store/ridge/ridge-object-status.store";

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
    // objects params
    dispatch<any>(loadMetroList());
    dispatch<any>(loadDistrictsList());
    dispatch<any>(loadWorkingPositionList());
    dispatch<any>(loadWorkingPositionList());
    dispatch<any>(loadSidebarCollapsState());
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
    // ridge
    dispatch<any>(loadRidgeObjectsList());
    dispatch<any>(loadRidgeObjectStatusList());
  }, []);

  return children;
};

export default AppLoader;
