import { combineReducers, configureStore } from "@reduxjs/toolkit";
// objects
import objectsReducer from "./object/objects.store";
import objectTypesReducer from "./object/object-types.store";
import objectStatusReducer from "./object/object-status.store";
import objectConditionsReducer from "./object/object-conditions.store";
// objects params
import metroReducer from "./object/metro.store";
import districtsReducer from "./object/districts.store";
import rentTypesReducer from "./object/rent-types.store";
import estateTypesReducer from "./object/estate-types.store";
import currentRenterReducer from "./object/current-renter.store";
import workingPositionReducer from "./user/working-position.store";
// meetings
import meetingsReducer from "./meeting/meetings.store";
import meetingTypesReducer from "./meeting/meeting-types.store";
import meetingStatusesReducer from "./meeting/meeting-status.store";
// users
import usersListReducer from "./user/users.store";
import userStatusesReducer from "./user/user-statuses.store";
// tasks
import tasksReducer from "./task/tasks.store";
// other
import sidebarCollapsStateReducer from "./sidebar-collaps-state.store";
import monthIndexReducer from "./month-index.store";
import updateMeetingReducer from "./meeting/update-meeting.store";
import updateObjectReducer from "./object/update-object.store";
import updateManagerReducer from "./user/update-manager.store";

const rootReducer = combineReducers({
  // objects
  objects: objectsReducer,
  objectStatus: objectStatusReducer,
  objectConditions: objectConditionsReducer,
  objectTypes: objectTypesReducer,
  // objects params
  metro: metroReducer,
  districts: districtsReducer,
  workingPosition: workingPositionReducer,
  currentRenters: currentRenterReducer,
  rentTypes: rentTypesReducer,
  estateTypes: estateTypesReducer,
  // users
  users: usersListReducer,
  userStatuses: userStatusesReducer,
  // meetings
  meetingStatuses: meetingStatusesReducer,
  meetings: meetingsReducer,
  meetingTypes: meetingTypesReducer,
  // tasks
  tasks: tasksReducer,
  // calendar
  monthIndex: monthIndexReducer,
  updateMeeting: updateMeetingReducer,
  updateObject: updateObjectReducer,
  updateManager: updateManagerReducer,
  // other
  sidebarCollapsState: sidebarCollapsStateReducer,
});

export function createStore() {
  return configureStore({
    reducer: rootReducer,
  });
}
