import { combineReducers, configureStore } from "@reduxjs/toolkit";
// objects
import objectsReducer from "./object/objects.store";
// objects params
import objectTypesReducer from "./object-params/object-types.store";
import objectStatusReducer from "./object-params/object-status.store";
import objectConditionsReducer from "./object-params/object-conditions.store";
import metroReducer from "./object-params/metro.store";
import districtsReducer from "./object-params/districts.store";
import rentTypesReducer from "./object-params/rent-types.store";
import estateTypesReducer from "./object-params/estate-types.store";
import currentRenterReducer from "./object-params/current-renter.store";
import workingPositionReducer from "./user-params/working-position.store";
import tradeAreaReducer from "./object-params/object-trade-area";
// meetings
import meetingsReducer from "./meeting/meetings.store";
import meetingTypesReducer from "./meeting/meeting-types.store";
import meetingStatusesReducer from "./meeting/meeting-status.store";
import objectPropertiesReducer from "./object-params/object-properties";
// users
import usersListReducer from "./user/users.store";
import userStatusesReducer from "./user-params/user-statuses.store";
// tasks
import tasksReducer from "./task/tasks.store";
// last contact
import lastContactReducer from "./last-contact/last-contact.store";
// presentations
import presentationsReducer from "./presentation/presentations.store";
import presentationStatusReducer from "./presentation/presentation-status.store";
// statictic
import staticticPositionsReducer from "./statictics/statictics-positions.store";
// other
import monthIndexReducer from "./month-index.store";
import currrentPathReducer from "./current-path.store";
import avatarReducer from "./avatar/avatar.store";
import userLicensesReducer from "./user/user-license.store";
import companiesReducer from "./company/company.store";
import contactsReducer from "./contact/contact.store";
import contactPositionsReducer from "./contact/contact-positions.store";
import citiesReducer from "./city/citites.store";

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
  objectProperties: objectPropertiesReducer,
  tradeArea: tradeAreaReducer,
  // users
  users: usersListReducer,
  userStatuses: userStatusesReducer,
  userLicenses: userLicensesReducer,
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
  presentationStatus: presentationStatusReducer,
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
