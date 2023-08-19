import { combineReducers, configureStore } from "@reduxjs/toolkit";
import objectsReducer from "./objects.store";
import usersListReducer from "./users.store";
import metroReducer from "./metro.store";
import districtsReducer from "./districts.store";
import objectStatusReducer from "./object-status.store";
import workingPositionReducer from "./working-position.store";
import sidebarCollapsStateReducer from "./sidebar-collaps-state.store";
import currentRenterReducer from "./current-renter.store";
import objectConditionsReducer from "./object-conditions.store";
import rentTypesReducer from "./rent-types.store";
import objectTypesReducer from "./object-types.store";
import estateTypesReducer from "./estate-types.store";
import userStatusesReducer from "./user-statuses.store";
import meetingStatusesReducer from "./meeting-status.store";
import meetingsReducer from "./meetings.store";
import meetingTypesReducer from "./meeting-types.store";

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
