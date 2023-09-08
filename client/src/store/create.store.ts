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
// ridge tasks
import ridgeTasksReducer from "./ridge-task/ridge-tasks.store";
import createRidgeTaskReducer from "./ridge-task/create-ridge-task.store";
import updateRidgeTaskReducer from "./ridge-task/update-ridge-task.store";
import openRidgeObjectPageReducer from "./ridge-object/open-ridge-object-page.store";
// ridge object
import ridgeObjectsReducer from "./ridge-object/ridge-objects.store";
import ridgeObjectStatusReducer from "./ridge-object/ridge-object-status.store";
import createRidgeObjectReducer from "./ridge-object/create-ridge-object.store";
import updateRidgeObjectReducer from "./ridge-object/update-ridge-object.store";
import createObjectFromRidgeReducer from "./ridge-object/create-object-from-ridge.store";
// other
import sidebarCollapsStateReducer from "./sidebar-collaps-state.store";
import monthIndexReducer from "./month-index.store";

const rootReducer = combineReducers({
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
  // ridge tasks
  ridgeTasks: ridgeTasksReducer,
  createRidgeTask: createRidgeTaskReducer,
  updateRidgeTask: updateRidgeTaskReducer,
  openRidgeObjectPage: openRidgeObjectPageReducer,
  // calendar
  monthIndex: monthIndexReducer,
  // ridge object
  ridgeObjects: ridgeObjectsReducer,
  ridgeObjectStatus: ridgeObjectStatusReducer,
  createRidgeObject: createRidgeObjectReducer,
  createObjectFromRidge: createObjectFromRidgeReducer,
  updateRidgeObject: updateRidgeObjectReducer,
  // other
  sidebarCollapsState: sidebarCollapsStateReducer,
});

export function createStore() {
  return configureStore({
    reducer: rootReducer,
  });
}
