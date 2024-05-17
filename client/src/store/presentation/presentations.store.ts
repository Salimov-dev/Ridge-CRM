import { io } from "socket.io-client";
import { Dispatch, createAction, createSlice } from "@reduxjs/toolkit";
// config
import configFile from "@config/config.json";
// utils
import isOutDated from "@utils/auth/is-out-date";
// services
import localStorageService from "@services/local-storage/local.storage-service";
import presentationsService from "@services/presentation/presentations.service";
// interfaces
import { IPresentation } from "@interfaces/presentation/presentation.interface";

const socket = io(configFile.ioEndPoint);

interface IPresentationStoreInitialState {
  entities: IPresentation[];
  isLoading: boolean;
  error: any;
  isLoggedIn: boolean;
  dataLoaded: boolean;
  lastFetch: string | null;
}

interface IStoreState {
  presentations: IPresentationStoreInitialState;
}

const initialState: IPresentationStoreInitialState =
  localStorageService.getAccessToken()
    ? {
        entities: [],
        isLoading: true,
        error: null,
        isLoggedIn: true,
        dataLoaded: false,
        lastFetch: null
      }
    : {
        entities: [],
        isLoading: false,
        error: null,
        isLoggedIn: false,
        dataLoaded: false,
        lastFetch: null
      };

const presentationsSlice = createSlice({
  name: "presentations",
  initialState,
  reducers: {
    presentationsRequested: (state) => {
      state.isLoading = true;
    },
    presentationsReceived: (state, action) => {
      state.entities = action.payload;
      state.dataLoaded = true;
      state.isLoading = false;
    },
    presentationsFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    presentationCreated: (state, action) => {
      const newPresentation = action.payload;
      if (
        !state.entities.some(
          (presentation) => presentation._id === newPresentation._id
        )
      ) {
        state.entities.push(newPresentation);
      }
    },
    presentationUpdateSuccessed: (state, action) => {
      state.entities[
        state.entities.findIndex((m) => m._id === action.payload._id)
      ] = action.payload;
    },
    presentationRemoved: (state, action) => {
      state.entities = state.entities.filter(
        (contact) => contact._id !== action.payload
      );
    }
  }
});

const presentationCreateRequested = createAction(
  "presentations/presentationsCreateRequested"
);
const createPresentationFailed = createAction(
  "presentations/createpresentationsFailed"
);
const presentationUpdateRequested = createAction(
  "presentations/presentationsUpdateRequested"
);
const presentationUpdateFailed = createAction(
  "presentations/presentationsUpdateFailed"
);
const removePresentationRequested = createAction(
  "presentations/removepresentationsRequested"
);
const removePresentationFailed = createAction(
  "presentations/removepresentationsFailed"
);

const { reducer: presentationsReducer, actions } = presentationsSlice;
const {
  presentationsRequested,
  presentationsReceived,
  presentationsFailed,
  presentationCreated,
  presentationUpdateSuccessed,
  presentationRemoved
} = actions;

export const loadPresentationsList =
  () =>
  async (
    dispatch: Dispatch,
    getState: () => { (): any; new (): any; presentations: { lastFetch: any } }
  ) => {
    const { lastFetch } = getState().presentations;
    if (isOutDated(lastFetch)) {
      dispatch(presentationsRequested());
      try {
        const { content } = await presentationsService.get();

        dispatch(presentationsReceived(content));
      } catch (error: any) {
        presentationsFailed(error.message);
      }
    }
  };

export function createPresentation(payload: IPresentation) {
  return async function (dispatch: Dispatch) {
    dispatch(presentationCreateRequested());
    try {
      const { content } = await presentationsService.create(payload);
      socket.emit("presentationCreated", content);
    } catch (error: any) {
      dispatch(createPresentationFailed(error.message));
    }
  };
}

export function createPresentationUpdate(payload: IPresentation) {
  return async function (dispatch: Dispatch) {
    dispatch(presentationCreateRequested());
    try {
      dispatch(presentationCreated(payload));
    } catch (error: any) {
      dispatch(createPresentationFailed(error.message));
    }
  };
}

export const updatePresentation =
  (payload: IPresentation) => async (dispatch: Dispatch) => {
    dispatch(presentationUpdateRequested());
    try {
      await presentationsService.update(payload);
      socket.emit("presentationUpdated", payload);
    } catch (error: any) {
      dispatch(presentationUpdateFailed(error.message));
    }
  };

export const updatePresentationUpdate =
  (payload: IPresentation) => async (dispatch: Dispatch) => {
    dispatch(presentationUpdateRequested());
    try {
      dispatch(presentationUpdateSuccessed(payload));
    } catch (error: any) {
      dispatch(presentationUpdateFailed(error.message));
    }
  };

export const removePresentation =
  (presentationsId: string) => async (dispatch: Dispatch) => {
    dispatch(removePresentationRequested());
    try {
      await presentationsService.remove(presentationsId);
      socket.emit("presentationDeleted", presentationsId);
    } catch (error: any) {
      dispatch(removePresentationFailed(error.message));
    }
  };

export const removePresentationUpdate =
  (presentationsId: string) => async (dispatch: Dispatch) => {
    dispatch(removePresentationRequested());
    try {
      dispatch(presentationRemoved(presentationsId));
    } catch (error: any) {
      dispatch(removePresentationFailed(error.message));
    }
  };

export const getPresentationById = (id: string) => (state: IStoreState) => {
  if (state.presentations.entities) {
    const presentation = state.presentations.entities.find(
      (contact) => contact._id === id
    );
    return presentation !== undefined ? presentation : null;
  }
};

export const getPresentationsByObjectId =
  (objectId: string) => (state: IStoreState) => {
    if (state.presentations.entities) {
      return state.presentations.entities.filter(
        (contact) => contact.objectId === objectId
      );
    }
  };

export const getPresentationsList = () => (state: IStoreState) =>
  state.presentations.entities;

export const getPresentationsLoadingStatus = () => (state: IStoreState) =>
  state.presentations.isLoading;

export default presentationsReducer;
