import { createAction, createSlice } from "@reduxjs/toolkit";
import localStorageService from "../services/local.storage-service";
import objectService from "../services/object.service";
import isOutDated from "../utils/is-out-date";

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

const objectsSlice = createSlice({
  name: "objects",
  initialState,
  reducers: {
    objectsRequested: (state) => {
      state.isLoading = true;
    },
    objectsReceived: (state, action) => {
      state.entities = action.payload;
      state.dataLoaded = true;
      state.isLoading = false;
    },
    objectsFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    objectCreated: (state, action) => {
      if (!Array.isArray(state.entities)) {
        state.entities = [];
      }
      state.entities.push(action.payload);
    },
    objectUpdateSuccessed: (state, action) => {
      state.entities[
        state.entities.findIndex((obj) => obj._id === action.payload._id)
      ] = action.payload;
    },
    objectRemoved: (state, action) => {
      state.entities = state.entities.filter(
        (obj) => obj._id !== action.payload
      );
    },
  },
});

const objectCreateRequested = createAction("objects/objectCreateRequested");
const createObjectFailed = createAction("objects/createObjectFailed");
const objectUpdateRequested = createAction("objects/objectUpdateRequested");
const objectUpdateFailed = createAction("objects/objectUpdateFailed");
const objectRemoveRequested = createAction("objects/objectRemoveRequested");
const objectRemoveFailed = createAction("objects/objectRemoveFailed");

const { reducer: objectsReducer, actions } = objectsSlice;
const {
  objectsRequested,
  objectsReceived,
  objectsFailed,
  objectCreated,
  objectUpdateSuccessed,
  objectRemoved,
} = actions;

export const loadObjectsList = () => async (dispatch, getState) => {
  const { lastFetch } = getState().objects;
  if (isOutDated(lastFetch)) {
    dispatch(objectsRequested());
    try {
      const { content } = await objectService.get();
      // setTimeout(() => {
        dispatch(objectsReceived(content));
      // }, 2000);
    } catch (error) {
      objectsFailed(error.message);
    }
  }
};

export const createObject = (payload) => async (dispatch) => {
  console.log("payload", payload);
  
  dispatch(objectCreateRequested);
  try {
    const { content } = await objectService.create(payload);
    dispatch(objectCreated(content));
  } catch (error) {
    dispatch(createObjectFailed(error.message));
  }
};

export const updateObject = (payload) => async (dispatch) => {
  dispatch(objectUpdateRequested());
  try {
    dispatch(objectUpdateSuccessed(payload));
    await objectService.update(payload);
  } catch (error) {
    dispatch(objectUpdateFailed(error.message));
  }
};

export const getObjectById = (objectId) => (state) => {
  if (state.objects.entities) {
    return state.objects.entities.find((obj) => obj._id === objectId);
  }
};

export const removeObject = (objectId) => async (dispatch) => {
  dispatch(objectRemoveRequested());
  try {
    dispatch(objectRemoved(objectId));
    await objectService.remove(objectId);
  } catch (error) {
    dispatch(objectRemoveFailed(error.message));
  }
};

export const getObjectsList = () => (state) => state.objects.entities;
export const getObjectsLoadingStatus = () => (state) => state.objects.isLoading;
export const getDataObjectsStatus = () => (state) => state.objects.dataLoaded;

export default objectsReducer;
