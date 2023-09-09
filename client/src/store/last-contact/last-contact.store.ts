import { createAction, createSlice } from "@reduxjs/toolkit";
import isOutDated from "../../utils/auth/is-out-date";
import localStorageService from "../../services/user/local.storage-service";
import lastContactService from "../../services/last-contact/last-contact.service";
import { createSelector } from "reselect";

const initialState = localStorageService.getAccessToken()
  ? {
      entities: null,
      isLoading: true,
      error: null,
      isLoggedIn: true,
      dataLoaded: false,
      lastFetch: null,
    }
  : {
      entities: null,
      isLoading: false,
      error: null,
      isLoggedIn: false,
      dataLoaded: false,
      lastFetch: null,
    };

const lastContactSlice = createSlice({
  name: "lastContact",
  initialState,
  reducers: {
    lastContactRequested: (state) => {
      state.isLoading = true;
    },
    lastContactReceived: (state, action) => {
      state.entities = action.payload;
      state.dataLoaded = true;
      state.isLoading = false;
    },
    lastContactFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    lastContactCreated: (state, action) => {
      if (!Array.isArray(state.entities)) {
        state.entities = [];
      }
      state.entities.push(action.payload);
    },
    lastContactUpdateSuccessed: (state, action) => {
      state.entities[
        state.entities.findIndex((m) => m._id === action.payload._id)
      ] = action.payload;
    },
    lastContactRemoved: (state, action) => {
      state.entities = state.entities.filter(
        (contact) => contact._id !== action.payload
      );
    },
    lastContactIsDoneStatus: (state, action) => {
      state.entities[
        state.entities.findIndex((m) => m._id === action.payload._id)
      ] = action.payload;
    },
  },
});

const lastContactCreateRequested = createAction(
  "lastContact/lastContactCreateRequested"
);
const createLastContactFailed = createAction(
  "lastContact/createlastContactFailed"
);
const lastContactUpdateRequested = createAction(
  "lastContact/lastContactUpdateRequested"
);
const lastContactUpdateFailed = createAction(
  "lastContact/lastContactUpdateFailed"
);
const removeLastContactRequested = createAction(
  "lastContact/removelastContactRequested"
);
const removeLastContactFailed = createAction(
  "lastContact/removelastContactFailed"
);
const lastContactIsDoneRequested = createAction(
  "lastContact/lastContactIsDoneRequested"
);
const lastContactNotDoneRequested = createAction(
  "lastContact/lastContactNotDoneRequested"
);
const lastContactIsDoneFailed = createAction(
  "lastContact/lastContactIsDoneFailed"
);
const lastContactNotDoneFailed = createAction(
  "lastContact/lastContactNotDoneFailed"
);

const { reducer: lastContactReducer, actions } = lastContactSlice;
const {
  lastContactRequested,
  lastContactReceived,
  lastContactFailed,
  lastContactCreated,
  lastContactUpdateSuccessed,
  lastContactRemoved,
  lastContactIsDoneStatus,
} = actions;

export const loadLastContactsList = () => async (dispatch, getState) => {
  const { lastFetch } = getState().lastContact;
  if (isOutDated(lastFetch)) {
    dispatch(lastContactRequested());
    try {
      const { content } = await lastContactService.get();
      dispatch(lastContactReceived(content));
    } catch (error) {
      lastContactFailed(error.message);
    }
  }
};

export function createLastContact(payload) {
  return async function (dispatch) {
    dispatch(lastContactCreateRequested());
    try {
      const { content } = await lastContactService.create(payload);
      dispatch(lastContactCreated(content));
    } catch (error) {
      dispatch(createLastContactFailed(error.message));
    }
  };
}

export const updateLastContact = (payload) => async (dispatch) => {
  dispatch(lastContactUpdateRequested());
  try {
    dispatch(lastContactUpdateSuccessed(payload));
    await lastContactService.update(payload);
  } catch (error) {
    dispatch(lastContactUpdateFailed(error.message));
  }
};

export const removeLastContact = (lastContactId) => async (dispatch) => {
  dispatch(removeLastContactRequested());
  try {
    dispatch(lastContactRemoved(lastContactId));
    await lastContactService.remove(lastContactId);
  } catch (error) {
    dispatch(removeLastContactFailed(error.message));
  }
};

export const setIsDoneLastContact = (payload) => async (dispatch) => {
  dispatch(lastContactIsDoneRequested());
  try {
    dispatch(lastContactIsDoneStatus(payload));
    await lastContactService.update(payload);
  } catch (error) {
    dispatch(lastContactIsDoneFailed(error.message));
  }
};

export const setIsNotDoneLastContact = (payload) => async (dispatch) => {
  dispatch(lastContactNotDoneRequested());
  try {
    dispatch(lastContactIsDoneStatus(payload));
    await lastContactService.update(payload);
  } catch (error) {
    dispatch(lastContactNotDoneFailed(error.message));
  }
};

export const getLastContactsList = () => (state) => state.lastContact.entities;

export const getObjectLastContactsList = (objectId) =>
  createSelector(
    (state) => state?.lastContact?.entities,
    (lastContact) =>
      lastContact?.filter((contact) => contact?.objectId === objectId)
  );

export const getLastContactsLoadingStatus = () => (state) =>
  state.lastContact.isLoading;

export const getDataLastContactsStatus = () => (state) =>
  state.lastContact.dataLoaded;

export const getLastContactsById = (id) => (state) => {
  if (state.lastContact.entities) {
    return state.lastContact.entities.find((contact) => contact._id === id);
  }
};

export const getLastContactsByObjectId = (objectId) => (state) => {
  if (state.lastContact.entities) {
    return state.lastContact.entities.filter(
      (contact) => contact.objectId === objectId
    );
  }
};

export default lastContactReducer;
