import { combineReducers, configureStore } from "@reduxjs/toolkit";
// objects
import objectsReducer from "./objects.store";
import objectTypesReducer from "./object-types.store";
import objectStatusReducer from "./object-status.store";
import objectConditionsReducer from "./object-conditions.store";
// meetings
import meetingsReducer from "./meetings.store";
import meetingTypesReducer from "./meeting-types.store";
import meetingStatusesReducer from "./meeting-status.store";
// users
import usersListReducer from "./users.store";
import userStatusesReducer from "./user-statuses.store";
// other objects params
import metroReducer from "./metro.store";
import districtsReducer from "./districts.store";
import rentTypesReducer from "./rent-types.store";
import estateTypesReducer from "./estate-types.store";
import currentRenterReducer from "./current-renter.store";
import workingPositionReducer from "./working-position.store";
// other
import sidebarCollapsStateReducer from "./sidebar-collaps-state.store";

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
});

export function createStore() {
  return configureStore({
    reducer: rootReducer,
  });
}
