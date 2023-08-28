import { combineReducers, configureStore } from "@reduxjs/toolkit";
// objects
import objectsReducer from "./object/objects.store";
import objectTypesReducer from "./object/object-types.store";
import objectStatusReducer from "./object/object-status.store";
import objectConditionsReducer from "./object/object-conditions.store";
// meetings
import meetingsReducer from "./meeting/meetings.store";
import meetingTypesReducer from "./meeting/meeting-types.store";
import meetingStatusesReducer from "./meeting/meeting-status.store";
// users
import usersListReducer from "./user/users.store";
import userStatusesReducer from "./user/user-statuses.store";
// other objects params
import metroReducer from "./object/metro.store";
import districtsReducer from "./object/districts.store";
import rentTypesReducer from "./object/rent-types.store";
import estateTypesReducer from "./object/estate-types.store";
import currentRenterReducer from "./object/current-renter.store";
import workingPositionReducer from "./user/working-position.store";
// other
import sidebarCollapsStateReducer from "./sidebar-collaps-state.store";
import monthIndexReducer from "./month-index.store";

const rootReducer = combineReducers({
  // objects
  objects: objectsReducer,
  objectStatus: objectStatusReducer,
  objectConditions: objectConditionsReducer,
  objectTypes: objectTypesReducer,
  // users
  users: usersListReducer,
  userStatuses: userStatusesReducer,
  // meetings
  meetingStatuses: meetingStatusesReducer,
  meetings: meetingsReducer,
  meetingTypes: meetingTypesReducer,
  // other objects params
  metro: metroReducer,
  districts: districtsReducer,
  workingPosition: workingPositionReducer,
  currentRenters: currentRenterReducer,
  rentTypes: rentTypesReducer,
  estateTypes: estateTypesReducer,
  // other
  sidebarCollapsState: sidebarCollapsStateReducer,
  monthIndex: monthIndexReducer,
});

export function createStore() {
  return configureStore({
    reducer: rootReducer,
  });
}
