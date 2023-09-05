import localStorageService from "../../services/user/local.storage-service";
import { createAction, createSlice } from "@reduxjs/toolkit";
import ridgeObjectservice from "../../services/ridge/ridge-object.service";
import isOutDated from "../../utils/auth/is-out-date";

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

const ridgeObjectsSlice = createSlice({
  name: "ridgeObjects",
  initialState,
  reducers: {
    ridgeObjectsRequested: (state) => {
      state.isLoading = true;
    },
    ridgeObjectsReceived: (state, action) => {
      state.entities = action.payload;
      state.dataLoaded = true;
      state.isLoading = false;
    },
    ridgeObjectsFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    ridgeObjectCreated: (state, action) => {
      if (!Array.isArray(state.entities)) {
        state.entities = [];
      }
      state.entities.push(action.payload);
    },
    ridgeObjectUpdateSuccessed: (state, action) => {
      state.entities[
        state.entities.findIndex((obj) => obj._id === action.payload._id)
      ] = action.payload;
    },
    ridgeObjectRemoved: (state, action) => {
      state.entities = state.entities.filter(
        (obj) => obj._id !== action.payload
      );
    },
  },
});

const ridgeObjectCreateRequested = createAction(
  "ridgeObjects/objectCreateRequested"
);
const createRidgeObjectFailed = createAction("ridgeObjects/createObjectFailed");
const ridgeObjectUpdateRequested = createAction(
  "ridgeObjects/objectUpdateRequested"
);
const ridgeObjectUpdateFailed = createAction("ridgeObjects/objectUpdateFailed");
const ridgeObjectRemoveRequested = createAction(
  "ridgeObjects/objectRemoveRequested"
);
const ridgeObjectRemoveFailed = createAction("ridgeObjects/objectRemoveFailed");

const { reducer: ridgeObjectsReducer, actions } = ridgeObjectsSlice;
const {
  ridgeObjectsRequested,
  ridgeObjectsReceived,
  ridgeObjectsFailed,
  ridgeObjectCreated,
  ridgeObjectUpdateSuccessed,
  ridgeObjectRemoved,
} = actions;

export const loadRidgeObjectsList = () => async (dispatch, getState) => {
  const { lastFetch } = getState().ridgeObjects;
  if (isOutDated(lastFetch)) {
    dispatch(ridgeObjectsRequested());
    try {
      const { content } = await ridgeObjectservice.get();
      dispatch(ridgeObjectsReceived(content));
    } catch (error) {
      ridgeObjectsFailed(error.message);
    }
  }
};

export const createRidgeObject = (payload) => async (dispatch) => {
  dispatch(ridgeObjectCreateRequested);
  try {
    const { content } = await ridgeObjectservice.create(payload);

    dispatch(ridgeObjectCreated(content));
  } catch (error) {
    dispatch(createRidgeObjectFailed(error.message));
  }
};

export const updateRidgeObject = (payload) => async (dispatch) => {
  dispatch(ridgeObjectUpdateRequested());
  try {
    dispatch(ridgeObjectUpdateSuccessed(payload));
    await ridgeObjectservice.update(payload);
  } catch (error) {
    dispatch(ridgeObjectUpdateFailed(error.message));
  }
};

export const removeRidgeObject = (objectId) => async (dispatch) => {
  dispatch(ridgeObjectRemoveRequested());
  try {
    dispatch(ridgeObjectRemoved(objectId));
    await ridgeObjectservice.remove(objectId);
  } catch (error) {
    dispatch(ridgeObjectRemoveFailed(error.message));
  }
};

export const getRidgeObjectById = (objectId) => (state) => {
  if (state?.ridgeObjects?.entities) {
    return state?.ridgeObjects?.entities?.find((obj) => obj?._id === objectId);
  }
};

export const getRidgeObjectsList = () => (state) => state.ridgeObjects.entities;
export const getRidgeObjectsLoadingStatus = () => (state) =>
  state.ridgeObjects.isLoading;
export const getDataRidgeObjectsStatus = () => (state) =>
  state.ridgeObjects.dataLoaded;

export default ridgeObjectsReducer;
