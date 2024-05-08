import { combineReducers, configureStore } from "@reduxjs/toolkit";
// objects
import objectsReducer from "./object/objects.store";
// objects params
import objectTypesReducer from "./object-params/object-types.store";
import objectStatusReducer from "./object-params/object-status.store";
import objectConditionsReducer from "./object-params/object-conditions.store";
import metroReducer from "./object-params/object-metro.store";
import districtsReducer from "./object-params/object-districts.store";
import rentTypesReducer from "./object-params/object-rent-types.store";
import estateTypesReducer from "./object-params/object-estate-types.store";
import currentRenterReducer from "./object-params/object-current-renter.store";
import tradeAreaReducer from "./object-params/object-trade-area";
import citiesReducer from "./city/citites.store";
// company
import companiesReducer from "./company/company.store";
// meetings
import meetingsReducer from "./meeting/meetings.store";
import meetingTypesReducer from "./meeting/meeting-types.store";
import meetingStatusesReducer from "./meeting/meeting-status.store";
import objectPropertiesReducer from "./object-params/object-properties";
// users
import usersListReducer from "./user/users.store";
import userStatusesReducer from "./user-params/user-statuses.store";
import userLicensesReducer from "./license/user-license.store";
import userRolesReducer from "./user-params/user-role.store";
// tasks
import tasksReducer from "./task/tasks.store";
// last contact
import lastContactReducer from "./last-contact/last-contact.store";
// presentations
import presentationsReducer from "./presentation/presentations.store";
import presentationStatusesReducer from "./presentation/presentation-statuses.store";
// statictic
import staticticPositionsReducer from "./statictics/statictics-positions.store";
// avatar
import avatarReducer from "./avatar/avatar.store";
// contact
import contactsReducer from "./contact/contact.store";
import contactPositionsReducer from "./contact/contact-positions.store";
// other
import monthIndexReducer from "./month-index/month-index.store";
import currrentPathReducer from "./current-path/current-path.store";

const rootReducer = combineReducers({
  // objects
  objects: objectsReducer,
  objectStatus: objectStatusReducer,
  objectConditions: objectConditionsReducer,
  objectTypes: objectTypesReducer,
  // objects params
  metro: metroReducer,
  districts: districtsReducer,
  currentRenters: currentRenterReducer,
  rentTypes: rentTypesReducer,
  estateTypes: estateTypesReducer,
  objectProperties: objectPropertiesReducer,
  tradeArea: tradeAreaReducer,
  // users
  users: usersListReducer,
  userStatuses: userStatusesReducer,
  userLicenses: userLicensesReducer,
  userRoles: userRolesReducer,
  // meetings
  meetings: meetingsReducer,
  meetingStatuses: meetingStatusesReducer,
  meetingTypes: meetingTypesReducer,
  // tasks
  tasks: tasksReducer,
  // calendar
  monthIndex: monthIndexReducer,
  // last contact
  lastContact: lastContactReducer,
  // currrentPath
  currrentPath: currrentPathReducer,
  // presentations
  presentations: presentationsReducer,
  presentationStatus: presentationStatusesReducer,
  //statictic
  staticticPositions: staticticPositionsReducer,
  // avatar
  avatar: avatarReducer,
  // companies
  companies: companiesReducer,
  // contacts
  contacts: contactsReducer,
  contactPositions: contactPositionsReducer,
  // cities
  cities: citiesReducer
});

export function createStore() {
  return configureStore({
    reducer: rootReducer
  });
}
