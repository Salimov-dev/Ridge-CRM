import { combineReducers, configureStore } from "@reduxjs/toolkit";
// objects
import objectsReducer from "./object/objects.store";
import updateObjectReducer from "./object/update-object.store";
import openObjectPageReducer from "./object/open-object-page.store";
// objects params
import objectTypesReducer from "./object/object-types.store";
import objectStatusReducer from "./object/object-status.store";
import objectConditionsReducer from "./object/object-conditions.store";
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
import createMeetingReducer from "./meeting/create-meeting.store";
import updateMeetingReducer from "./meeting/update-meeting.store";
// users
import createUserReducer from "./user/create-user.store";
import usersListReducer from "./user/users.store";
import userStatusesReducer from "./user/user-statuses.store";
import updateManagerReducer from "./user/update-user.store";
import updateManagerTaskReducer from "./task/update-manager-task.store";
// tasks
import tasksReducer from "./task/tasks.store";
import updateMyTaskReducer from "./task/update-my-task.store";
import createManagerTaskReducer from "./task/create-manager-task.store";
import createObjectReducer from "./object/create-object.store";
import createMyTaskReducer from "./task/create-my-task.store";
// last contact
import lastContactReducer from "./last-contact/last-contact.store";
import createLastContactReducer from "./last-contact/create-last-contact.store";
import updateLastContactReducer from "./last-contact/update-last-contact.store";
// sidebar
import sidebarCollapsStateReducer from "./sidebar-collaps-state.store";
// other
import monthIndexReducer from "./month-index.store";
import authStateReducer from "./user/auth.store";
import objectPropertiesReducer from "./object/object-properties";
import currrentPathReducer from "./current-path.store";

const rootReducer = combineReducers({
  // auth state
  authState: authStateReducer,
  // objects
  objects: objectsReducer,
  objectStatus: objectStatusReducer,
  objectConditions: objectConditionsReducer,
  objectTypes: objectTypesReducer,
  openObjectPage: openObjectPageReducer,
  createObject: createObjectReducer,
  updateObject: updateObjectReducer,
  // objects params
  metro: metroReducer,
  districts: districtsReducer,
  workingPosition: workingPositionReducer,
  currentRenters: currentRenterReducer,
  rentTypes: rentTypesReducer,
  estateTypes: estateTypesReducer,
  objectProperties: objectPropertiesReducer,
  // users
  users: usersListReducer,
  userStatuses: userStatusesReducer,
  updateManager: updateManagerReducer,
  createUser: createUserReducer,
  // meetings
  meetings: meetingsReducer,
  meetingStatuses: meetingStatusesReducer,
  meetingTypes: meetingTypesReducer,
  createMeeting: createMeetingReducer,
  updateMeeting: updateMeetingReducer,
  // tasks
  tasks: tasksReducer,
  createMyTask: createMyTaskReducer,
  updateMyTask: updateMyTaskReducer,
  createManagerTask: createManagerTaskReducer,
  updateManagerTask: updateManagerTaskReducer,
  // calendar
  monthIndex: monthIndexReducer,
  // last contact
  lastContact: lastContactReducer,
  createLastContact: createLastContactReducer,
  updateLastContact: updateLastContactReducer,
  // sidebar collaps state
  sidebarCollapsState: sidebarCollapsStateReducer,
  // currrentPath
  currrentPath: currrentPathReducer,
});

export function createStore() {
  return configureStore({
    reducer: rootReducer,
  });
}
