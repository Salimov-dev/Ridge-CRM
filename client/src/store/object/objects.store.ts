import dayjs from "dayjs";
import { io } from "socket.io-client";
import { createAction, createSlice } from "@reduxjs/toolkit";
// config
import configFile from "@config/config.json";
// utils
import isOutDated from "@utils/auth/is-out-date";
// services
import objectService from "@services/object/object.service";
import localStorageService from "@services/user/local.storage-service";
import { useSelector } from "react-redux";
import {
  getCurrentUserData,
  getCurrentUserId,
  getIsUserCurator,
  getIsUserManager
} from "../user/users.store";

const socket = io(configFile.ioEndPoint);

const initialState = localStorageService.getAccessToken()
  ? {
      entities: null,
      isLoading: true,
      error: null,
      isLoggedIn: true,
      dataLoaded: false,
      lastFetch: null,
      auth: { userId: localStorageService.getUserId() }
    }
  : {
      entities: null,
      isLoading: false,
      error: null,
      isLoggedIn: false,
      dataLoaded: false,
      lastFetch: null
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
    }
  }
});

const objectCreateRequested = createAction("objects/objectCreateRequested");
const createObjectFailed = createAction("objects/createObjectFailed");
const objectUpdateRequested = createAction("objects/objectUpdateRequested");
const objectUpdateFailed = createAction("objects/objectUpdateFailed");
const multipleObjectsUpdateFailed = createAction(
  "objects/multipleObjectsUpdateFailed"
);
const objectUpdateMultipleObjectsFailed = createAction(
  "objects/objectUpdateMultipleObjectsFailed"
);
const objectRemoveRequested = createAction("objects/objectRemoveRequested");
const objectRemoveFailed = createAction("objects/objectRemoveFailed");

const { reducer: objectsReducer, actions } = objectsSlice;
const {
  objectsRequested,
  objectsReceived,
  objectsFailed,
  objectCreated,
  objectUpdateSuccessed,
  objectRemoved
} = actions;

export const loadObjectsList = () => async (dispatch, getState) => {
  const { lastFetch } = getState().objects;
  if (isOutDated(lastFetch)) {
    dispatch(objectsRequested());
    try {
      const { content } = await objectService.get();
      dispatch(objectsReceived(content));
    } catch (error) {
      objectsFailed(error.message);
    }
  }
};

export const createObject = (payload) => async (dispatch) => {
  dispatch(objectCreateRequested);
  try {
    const { content } = await objectService.create(payload);
    socket.emit("objectCreated", content);
  } catch (error) {
    dispatch(createObjectFailed(error.message));
  }
};

export const createObjectUpdate = (payload) => async (dispatch) => {
  dispatch(objectCreateRequested);
  try {
    dispatch(objectCreated(payload));
  } catch (error) {
    dispatch(createObjectFailed(error.message));
  }
};

export const updateObject = (payload) => async (dispatch) => {
  dispatch(objectUpdateRequested());
  try {
    await objectService.update(payload);
    socket.emit("objectUpdated", payload);
  } catch (error) {
    dispatch(objectUpdateFailed(error.message));
  }
};

export const updateObjectUpdate = (payload) => async (dispatch) => {
  dispatch(objectUpdateRequested());
  try {
    dispatch(objectUpdateSuccessed(payload));
  } catch (error) {
    dispatch(objectUpdateFailed(error.message));
  }
};

export const updateMultipleObjects =
  (objectIds, userId) => async (dispatch) => {
    try {
      const updatedObjects = await objectService.updateMultiple(
        objectIds,
        userId
      );
      const result = updatedObjects?.content;
      socket.emit("multipleObjectsUpdated", result);
      return result;
    } catch (error) {
      dispatch(objectUpdateMultipleObjectsFailed(error.message));
    }
  };

export const updateMultipleObjectsUpdate = () => async (dispatch) => {
  try {
    const { content } = await objectService.get();
    dispatch(objectsReceived(content));
  } catch (error) {
    dispatch(multipleObjectsUpdateFailed(error.message));
  }
};

export const removeObject = (objectId) => async (dispatch) => {
  dispatch(objectRemoveRequested());
  try {
    await objectService.remove(objectId);
    socket.emit("objectDeleted", objectId);
  } catch (error) {
    dispatch(objectRemoveFailed(error.message));
  }
};

export const removeObjectUpdate = (objectId) => async (dispatch) => {
  dispatch(objectRemoveRequested());
  try {
    dispatch(objectRemoved(objectId));
  } catch (error) {
    dispatch(objectRemoveFailed(error.message));
  }
};

export const getObjectById = (objectId) => (state) => {
  if (state?.objects?.entities) {
    return state?.objects?.entities?.find((obj) => obj?._id === objectId);
  }
};

export const getObjectAddressById = (objectId) => (state) => {
  if (!objectId) {
    return null;
  }
  if (state?.objects?.entities) {
    const object = state?.objects?.entities?.find(
      (obj) => obj?._id === objectId
    );
    const fullAddress = `${object?.city}, ${object?.address}`;
    return fullAddress;
  }
};

export const getObjectsWeeklyList = () => (state) => {
  const currentDate = dayjs();
  const objects = state.objects.entities;

  const weeklyObjects = objects?.filter((object) => {
    const createdAt = dayjs(object.created_at);
    const startOfWeek = currentDate.startOf("week");
    const endOfWeek = currentDate.endOf("week");
    return createdAt.isBetween(startOfWeek, endOfWeek);
  });

  return weeklyObjects;
};

export const getObjectsList = () => (state) => state.objects.entities;
export const getObjectsLoadingStatus = () => (state) => state.objects.isLoading;
export const getDataObjectsStatus = () => (state) => state.objects.dataLoaded;

export default objectsReducer;
