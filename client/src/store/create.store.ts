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
import updateManagerReducer from "./user/update-user.store";
import updateMyTaskReducer from "./task/update-my-task.store";
import updateManagerTaskReducer from "./task/update-manager-task.store";
import openObjectPageReducer from "./object/open-object-page.store";
import ridgeObjectsReducer from "./ridge/ridge-objects.store";
import ridgeObjectStatusReducer from "./ridge/ridge-object-status.store";
import createMeetingReducer from "./meeting/create-meeting.store";
import createManagerTaskReducer from "./task/create-manager-task.store";
import createMyTaskReducer from "./task/create-my-task.store";

const rootReducer = combineReducers({
  // objects
  objects: objectsReducer,
  objectStatus: objectStatusReducer,
  objectConditions: objectConditionsReducer,
  objectTypes: objectTypesReducer,
  openObjectPage: openObjectPageReducer,
  updateObject: updateObjectReducer,
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
  updateManager: updateManagerReducer,
  // meetings
  meetingStatuses: meetingStatusesReducer,
  meetings: meetingsReducer,
  meetingTypes: meetingTypesReducer,
  updateMeeting: updateMeetingReducer,
  createMeeting: createMeetingReducer,
  // tasks
  tasks: tasksReducer,
  createMyTask: createMyTaskReducer,
  updateMyTask: updateMyTaskReducer,
  createManagerTask: createManagerTaskReducer,
  updateManagerTask: updateManagerTaskReducer,
  // calendar
  monthIndex: monthIndexReducer,
  // ridge
  ridgeObjects: ridgeObjectsReducer,
  ridgeObjectStatus: ridgeObjectStatusReducer,
  // other
  sidebarCollapsState: sidebarCollapsStateReducer,
});

export function createStore() {
  return configureStore({
    reducer: rootReducer,
  });
}
