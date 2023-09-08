import { useEffect } from "react";
import { useDispatch } from "react-redux";
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
import { loadUsersList } from "../store/user/users.store";
import { loadUserStatusesList } from "../store/user/user-statuses.store";
// tasks
import { loadTasksList } from "../store/task/tasks.store";
import { loadRidgeTasksList } from "../store/ridge-task/ridge-tasks.store";
// ridge
import { loadRidgeObjectsList } from "../store/ridge-object/ridge-objects.store";
import { loadRidgeObjectStatusList } from "../store/ridge-object/ridge-object-status.store";
// other
import { loadSidebarCollapsState } from "../store/sidebar-collaps-state.store";

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
    // ridge
    dispatch<any>(loadRidgeObjectsList());
    dispatch<any>(loadRidgeObjectStatusList());
    // other
    dispatch<any>(loadSidebarCollapsState());
  }, []);

  return children;
};

export default AppLoader;
