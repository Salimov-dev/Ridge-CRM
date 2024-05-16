import dayjs from "dayjs";
import { io } from "socket.io-client";
import { useSelector } from "react-redux";
import isBetween from "dayjs/plugin/isBetween";
import { Dispatch, createAction, createSlice } from "@reduxjs/toolkit";
// config
import configFile from "@config/config.json";
// utils
import isOutDated from "@utils/auth/is-out-date";
// services
import objectService from "@services/object/object.service";
import localStorageService from "@services/local-storage/local.storage-service";
// interfaces
import { IObject } from "@interfaces/object/object.interface";
// store
import { updateCompanies } from "@store/company/company.store";
import { updateContacts } from "@store/contact/contact.store";
import { getCurrentUserId } from "@store/user/users.store";

const socket = io(configFile.ioEndPoint);
dayjs.extend(isBetween);

interface IObjectsStoreInitialState {
  entities: IObject[];
  isLoading: boolean;
  error: any;
  isLoggedIn: boolean;
  dataLoaded: boolean;
  lastFetch: string | null;
  auth: { userId: string | null };
}

interface IStoreState {
  objects: IObjectsStoreInitialState;
}

const initialState: IObjectsStoreInitialState =
  localStorageService.getAccessToken()
    ? {
        entities: [],
        isLoading: true,
        error: null,
        isLoggedIn: true,
        dataLoaded: false,
        lastFetch: null,
        auth: { userId: localStorageService.getUserId() }
      }
    : {
        entities: [],
        isLoading: false,
        error: null,
        isLoggedIn: false,
        dataLoaded: false,
        lastFetch: null,
        auth: { userId: null }
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
      const newObject = action.payload;
      if (!state.entities.some((object) => object._id === newObject._id)) {
        state.entities.push(newObject);
      }
    },
    objectUpdateSuccessed: (state, action) => {
      state.entities[
        state.entities.findIndex((obj) => obj._id === action.payload._id)
      ] = action.payload;
    },
    objectsUpdateSuccessed: (state, action) => {
      const { updatedObjects } = action.payload;

      state.entities = state.entities.map((obj) => {
        const updatedObject = updatedObjects.find(
          (updatedObj: IObject) => updatedObj._id === obj._id
        );
        if (updatedObject) {
          return updatedObject;
        }
        return obj;
      });
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
  objectsUpdateSuccessed,
  objectRemoved
} = actions;

export const loadObjectsList =
  () =>
  async (
    dispatch: Dispatch,
    getState: () => { (): any; new (): any; objects: { lastFetch: any } }
  ) => {
    const { lastFetch } = getState().objects;
    if (isOutDated(lastFetch)) {
      dispatch(objectsRequested());
      try {
        const { content } = await objectService.get();
        dispatch(objectsReceived(content));
      } catch (error: any) {
        objectsFailed(error.message);
      }
    }
  };

export const createObject =
  (payload: IObject) => async (dispatch: Dispatch) => {
    dispatch(objectCreateRequested());
    try {
      const { content } = await objectService.create(payload);

      dispatch(updateContacts(content.updatedContacts));
      dispatch(updateCompanies(content.updatedCompanies));
      socket.emit("objectCreated", content.newObject);
    } catch (error: any) {
      dispatch(createObjectFailed(error.message));
    }
  };

export const createObjectUpdate =
  (payload: IObject) => async (dispatch: Dispatch) => {
    dispatch(objectCreateRequested());
    try {
      dispatch(objectCreated(payload));
    } catch (error: any) {
      dispatch(createObjectFailed(error.message));
    }
  };

export const updateObject = (payload) => async (dispatch: Dispatch) => {
  dispatch(objectUpdateRequested());
  try {
    const { content } = await objectService.update(payload);

    dispatch(updateCompanies(content.updatedCompanies));
    socket.emit("objectUpdated", payload.newData);
  } catch (error: any) {
    const errorMessage = error.response.data.error.message;

    dispatch(objectUpdateFailed(errorMessage));
    throw errorMessage;
  }
};

export const updateObjectUpdate =
  (payload: IObject) => async (dispatch: Dispatch) => {
    dispatch(objectUpdateRequested());
    try {
      dispatch(objectUpdateSuccessed(payload));
    } catch (error: any) {
      dispatch(objectUpdateFailed(error.message));
    }
  };

export const updateObjects =
  (payload: IObject) => async (dispatch: Dispatch) => {
    dispatch(objectUpdateRequested());
    try {
      socket.emit("objectsUpdated", payload);
    } catch (error: any) {
      dispatch(objectUpdateFailed(error.message));
    }
  };

export const updateObjectsUpdate =
  (payload: IObject) => async (dispatch: Dispatch) => {
    dispatch(objectUpdateRequested());
    try {
      dispatch(objectsUpdateSuccessed(payload));
    } catch (error: any) {
      dispatch(objectUpdateFailed(error.message));
    }
  };

export const updateMultipleObjects =
  (objectIds: string, userId: string) => async (dispatch: Dispatch) => {
    try {
      const updatedObjects = await objectService.updateMultiple(
        objectIds,
        userId
      );
      const result = updatedObjects?.content;
      socket.emit("multipleObjectsUpdated", result);
      return result;
    } catch (error: any) {
      dispatch(objectUpdateMultipleObjectsFailed(error.message));
    }
  };

export const updateMultipleObjectsUpdate = () => async (dispatch: Dispatch) => {
  try {
    const { content } = await objectService.get();
    dispatch(objectsReceived(content));
  } catch (error: any) {
    dispatch(multipleObjectsUpdateFailed(error.message));
  }
};

export const removeObject =
  (objectId: string) => async (dispatch: Dispatch) => {
    dispatch(objectRemoveRequested());
    try {
      const { content } = await objectService.remove(objectId);
      const updatedCompanies = content?.updatedCompanies;

      dispatch(updateCompanies(updatedCompanies));
      socket.emit("objectDeleted", objectId);
    } catch (error: any) {
      dispatch(objectRemoveFailed(error.message));
    }
  };

export const removeObjectUpdate =
  (objectId: string) => async (dispatch: Dispatch) => {
    dispatch(objectRemoveRequested());
    try {
      dispatch(objectRemoved(objectId));
    } catch (error: any) {
      dispatch(objectRemoveFailed(error.message));
    }
  };

export const getObjectById =
  (objectId: string | null) => (state: IStoreState) => {
    if (state?.objects?.entities) {
      const object = state?.objects?.entities?.find(
        (obj) => obj?._id === objectId
      );
      return object !== undefined ? object : null;
    } else {
      return null;
    }
  };

export const getObjectAddressById =
  (objectId: string) => (state: IStoreState) => {
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

export const getCurrentUserObjects = () => (state: IStoreState) => {
  const currentUserId = useSelector(getCurrentUserId());
  if (state?.objects?.entities) {
    return state?.objects?.entities?.filter(
      (obj: IObject) => obj?.userId === currentUserId
    );
  }
};

export const getObjectsWeeklyList = () => (state: IStoreState) => {
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

export const getObjectsList = () => (state: IStoreState) =>
  state.objects.entities;
export const getObjectsLoadingStatus = () => (state: IStoreState) =>
  state.objects.isLoading;
export const getDataObjectsStatus = () => (state: IStoreState) =>
  state.objects.dataLoaded;

export default objectsReducer;
