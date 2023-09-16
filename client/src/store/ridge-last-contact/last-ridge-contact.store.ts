import { createAction, createSlice } from "@reduxjs/toolkit";
import isOutDated from "../../utils/auth/is-out-date";
import localStorageService from "../../services/user/local.storage-service";
import ridgeLastContactService from "../../services/last-contact/ridge-last-contact.service";
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

const ridgeLastContactSlice = createSlice({
  name: "ridgeLastContact",
  initialState,
  reducers: {
    ridgeLastContactRequested: (state) => {
      state.isLoading = true;
    },
    ridgeLastContactReceived: (state, action) => {
      state.entities = action.payload;
      state.dataLoaded = true;
      state.isLoading = false;
    },
    ridgeLastContactFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    ridgeLastContactCreated: (state, action) => {
      if (!Array.isArray(state.entities)) {
        state.entities = [];
      }
      state.entities.push(action.payload);
    },
    ridgeLastContactUpdateSuccessed: (state, action) => {
      state.entities[
        state.entities.findIndex((m) => m._id === action.payload._id)
      ] = action.payload;
    },
    ridgeLastContactRemoved: (state, action) => {
      state.entities = state.entities.filter(
        (contact) => contact._id !== action.payload
      );
    },
    ridgeLastContactIsDoneStatus: (state, action) => {
      state.entities[
        state.entities.findIndex((m) => m._id === action.payload._id)
      ] = action.payload;
    },
  },
});

const ridgeLastContactCreateRequested = createAction(
  "ridgeLastContact/ridgeLastContactCreateRequested"
);
const createRidgeLastContactFailed = createAction(
  "ridgeLastContact/createRidgeLastContactFailed"
);
const ridgeLastContactUpdateRequested = createAction(
  "ridgeLastContact/ridgeLastContactUpdateRequested"
);
const ridgeLastContactUpdateFailed = createAction(
  "ridgeLastContact/ridgeLastContactUpdateFailed"
);
const removeRidgeLastContactRequested = createAction(
  "ridgeLastContact/removeRidgeLastContactRequested"
);
const removeRidgeLastContactFailed = createAction(
  "ridgeLastContact/removeRidgeLastContactFailed"
);
const ridgeLastContactIsDoneRequested = createAction(
  "ridgeLastContact/ridgeLastContactIsDoneRequested"
);
const ridgeLastContactNotDoneRequested = createAction(
  "ridgeLastContact/ridgeLastContactNotDoneRequested"
);
const ridgeLastContactIsDoneFailed = createAction(
  "ridgeLastContact/ridgeLastContactIsDoneFailed"
);
const ridgeLastContactNotDoneFailed = createAction(
  "ridgeLastContact/ridgeLastContactNotDoneFailed"
);

const { reducer: ridgeLastContactReducer, actions } = ridgeLastContactSlice;
const {
  ridgeLastContactRequested,
  ridgeLastContactReceived,
  ridgeLastContactFailed,
  ridgeLastContactCreated,
  ridgeLastContactUpdateSuccessed,
  ridgeLastContactRemoved,
  ridgeLastContactIsDoneStatus,
} = actions;

export const loadRidgeLastContactsList = () => async (dispatch, getState) => {
  const { lastFetch } = getState().ridgeLastContact;
  if (isOutDated(lastFetch)) {
    dispatch(ridgeLastContactRequested());
    try {
      const { content } = await ridgeLastContactService.get();
      dispatch(ridgeLastContactReceived(content));
    } catch (error) {
      ridgeLastContactFailed(error.message);
    }
  }
};

export function createRidgeLastContact(payload) {
  return async function (dispatch) {
    dispatch(ridgeLastContactCreateRequested());
    try {
      const { content } = await ridgeLastContactService.create(payload);
      dispatch(ridgeLastContactCreated(content));
    } catch (error) {
      dispatch(createRidgeLastContactFailed(error.message));
    }
  };
}

export const updateRidgeLastContact = (payload) => async (dispatch) => {
  dispatch(ridgeLastContactUpdateRequested());
  try {
    dispatch(ridgeLastContactUpdateSuccessed(payload));
    await ridgeLastContactService.update(payload);
  } catch (error) {
    dispatch(ridgeLastContactUpdateFailed(error.message));
  }
};

export const removeRidgeLastContact =
  (ridgeLastContactId) => async (dispatch) => {
    dispatch(removeRidgeLastContactRequested());
    try {
      dispatch(ridgeLastContactRemoved(ridgeLastContactId));
      await ridgeLastContactService.remove(ridgeLastContactId);
    } catch (error) {
      dispatch(removeRidgeLastContactFailed(error.message));
    }
  };

export const setIsDoneRidgeLastContact = (payload) => async (dispatch) => {
  dispatch(ridgeLastContactIsDoneRequested());
  try {
    dispatch(ridgeLastContactIsDoneStatus(payload));
    await ridgeLastContactService.update(payload);
  } catch (error) {
    dispatch(ridgeLastContactIsDoneFailed(error.message));
  }
};

export const setIsNotDoneRidgeLastContact = (payload) => async (dispatch) => {
  dispatch(ridgeLastContactNotDoneRequested());
  try {
    dispatch(ridgeLastContactIsDoneStatus(payload));
    await ridgeLastContactService.update(payload);
  } catch (error) {
    dispatch(ridgeLastContactNotDoneFailed(error.message));
  }
};

export const getRidgeLastContactsList = () => (state) =>
  state.ridgeLastContact.entities;

export const getObjectRidgeLastContactsList = (objectId) =>
  createSelector(
    (state) => state?.ridgeLastContact?.entities,
    (ridgeLastContact) =>
      ridgeLastContact?.filter((contact) => contact?.objectId === objectId)
  );

export const getRidgeLastContactsLoadingStatus = () => (state) =>
  state.ridgeLastContact.isLoading;

export const getDataRidgeLastContactsStatus = () => (state) =>
  state.ridgeLastContact.dataLoaded;

export const getRidgeLastContactsById = (id) => (state) => {
  if (state.ridgeLastContact.entities) {
    return state.ridgeLastContact.entities.find(
      (contact) => contact._id === id
    );
  }
};

export const getRidgeLastContactsByObjectId = (objectId) => (state) => {
  if (state.ridgeLastContact.entities) {
    return state.ridgeLastContact.entities.filter(
      (contact) => contact.objectId === objectId
    );
  }
};

export default ridgeLastContactReducer;
