import { createAction, createSlice } from "@reduxjs/toolkit";
import localStorageService from "../../services/user/local.storage-service";
import presentationsService from "../../services/presentation/presentations.service";
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
      if (!Array.isArray(state.entities)) {
        state.entities = [];
      }
      state.entities.push(action.payload);
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
    },
  },
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
  presentationRemoved,
} = actions;

export const loadPresentationsList = () => async (dispatch, getState) => {
    const { lastFetch } = getState().presentations;
    if (isOutDated(lastFetch)) {
      dispatch(presentationsRequested());
      try {
        const { content } = await presentationsService.get();

        dispatch(presentationsReceived(content));
      } catch (error) {
        presentationsFailed(error.message);
      }
    }

};

export function createPresentation(payload) {
  return async function (dispatch) {
    dispatch(presentationCreateRequested());
    try {
      const { content } = await presentationsService.create(payload);
      dispatch(presentationCreated(content));
    } catch (error) {
      dispatch(createPresentationFailed(error.message));
    }
  };
}

export const updatePresentation = (payload) => async (dispatch) => {
  dispatch(presentationUpdateRequested());
  try {
    dispatch(presentationUpdateSuccessed(payload));
    await presentationsService.update(payload);
  } catch (error) {
    dispatch(presentationUpdateFailed(error.message));
  }
};

export const removePresentation = (presentationsId) => async (dispatch) => {
  dispatch(removePresentationRequested());
  try {
    dispatch(presentationRemoved(presentationsId));
    await presentationsService.remove(presentationsId);
  } catch (error) {
    dispatch(removePresentationFailed(error.message));
  }
};

export const getPresentationsList = () => (state) => state.presentations.entities;

export const getPresentationsLoadingStatus = () => (state) =>
  state.presentations.isLoading;

export const getPresentationById = (id) => (state) => {
  if (state.presentations.entities) {
    return state.presentations.entities.find((contact) => contact._id === id);
  }
};

export const getPresentationsByObjectId = (objectId) => (state) => {
  if (state.presentations.entities) {
    return state.presentations.entities.filter(
      (contact) => contact.objectId === objectId
    );
  }
};

export default presentationsReducer;