import { combineReducers, configureStore } from "@reduxjs/toolkit";
// auth
import authStateReducer from "./auth/auth.store";
// objects
import objectsReducer from "./object/objects.store";
import updateObjectReducer from "./object/update-object.store";
import openObjectPageReducer from "./object/open-object-page.store";
// objects params
import objectTypesReducer from "./object-params/object-types.store";
import objectStatusReducer from "./object-params/object-status.store";
import objectConditionsReducer from "./object-params/object-conditions.store";
import metroReducer from "./object-params/metro.store";
import districtsReducer from "./object-params/districts.store";
import rentTypesReducer from "./object-params/rent-types.store";
import estateTypesReducer from "./object-params/estate-types.store";
import currentRenterReducer from "./object-params/current-renter.store";
import workingPositionReducer from "./user/working-position.store";
import transferObjectToAnotherManagerReducer from "./object/transfer-object-to-another-manager.store";
import tradeAreaReducer from "./object-params/object-trade-area";
// meetings
import meetingsReducer from "./meeting/meetings.store";
import meetingTypesReducer from "./meeting/meeting-types.store";
import meetingStatusesReducer from "./meeting/meeting-status.store";
import createMeetingReducer from "./meeting/create-meeting.store";
import objectPropertiesReducer from "./object-params/object-properties";
import updateMeetingReducer from "./meeting/update-meeting.store";
// users
import createUserReducer from "./user/create-user.store";
import usersListReducer from "./user/users.store";
import loginReducer from "./auth/login.store";
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
// presentations
import createPresentationReducer from "./presentation/create-presentation.store";
import presentationsReducer from "./presentation/presentations.store";
import presentationStatusReducer from "./presentation/presentation-status.store";
import updatePresentationReducer from "./presentation/update-presentation.store";
// calendar
import openSelectedDayReducer from "./calendar/open-selected-day.store";
// statictic
import staticticPositionsReducer from "./statictics/statictics-positions.store";
// other
import monthIndexReducer from "./month-index.store";
import currrentPathReducer from "./current-path.store";
import avatarReducer from "./avatar/avatar.store";
import updateUserAvatarReducer from "./avatar/update-avatar.store";

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
  transferObjectToAnotherManager: transferObjectToAnotherManagerReducer,
  // objects params
  metro: metroReducer,
  districts: districtsReducer,
  workingPosition: workingPositionReducer,
  currentRenters: currentRenterReducer,
  rentTypes: rentTypesReducer,
  estateTypes: estateTypesReducer,
  objectProperties: objectPropertiesReducer,
  tradeArea: tradeAreaReducer,
  // users
  login: loginReducer,
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
  openSelectedDay: openSelectedDayReducer,
  // last contact
  lastContact: lastContactReducer,
  createLastContact: createLastContactReducer,
  updateLastContact: updateLastContactReducer,
  // sidebar collaps state
  sidebarCollapsState: sidebarCollapsStateReducer,
  // currrentPath
  currrentPath: currrentPathReducer,
  // presentations
  presentations: presentationsReducer,
  presentationStatus: presentationStatusReducer,
  createPresentation: createPresentationReducer,
  updatePresentation: updatePresentationReducer,
  //statictic
  staticticPositions: staticticPositionsReducer,
  // upload
  avatar: avatarReducer,
  // avatar
  updateUserAvatar: updateUserAvatarReducer,
});

export function createStore() {
  return configureStore({
    reducer: rootReducer,
  });
}
