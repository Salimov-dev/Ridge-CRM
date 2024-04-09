import { io } from "socket.io-client";
import { createSelector } from "reselect";
import { createAction, createSlice } from "@reduxjs/toolkit";
// utils
import isOutDated from "@utils/auth/is-out-date";
// services
import localStorageService from "@services/user/local.storage-service";
import userLicenseService from "@services/user/user-license.service";
// config
import configFile from "@config/config.json";

const socket = io(configFile.ioEndPoint);

const initialState = localStorageService.getAccessToken()
  ? {
      entities: null,
      isLoading: true,
      error: null,
      isLoggedIn: true,
      dataLoaded: false,
      lastFetch: null
    }
  : {
      entities: null,
      isLoading: false,
      error: null,
      isLoggedIn: false,
      dataLoaded: false,
      lastFetch: null
    };

const userLicensesSlice = createSlice({
  name: "userLicenses",
  initialState,
  reducers: {
    userLicensesRequested: (state) => {
      state.isLoading = true;
    },
    userLicensesReceived: (state, action) => {
      state.entities = action.payload;
      state.dataLoaded = true;
      state.isLoading = false;
    },
    userLicensesFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    userLicenseCreated: (state, action) => {
      if (!Array.isArray(state.entities)) {
        state.entities = [];
      }
      state.entities.push(action.payload);
    },
    userLicenseUpdateSuccessed: (state, action) => {
      state.entities[
        state.entities.findIndex(
          (license) => license._id === action.payload._id
        )
      ] = action.payload;
    },
    userLicenseRemoved: (state, action) => {
      state.entities = state.entities.filter(
        (user) => user._id !== action.payload
      );
    }
  }
});

const userLicenseUpdateRequested = createAction(
  "userLicenses/userLicenseUpdateRequested"
);
const userLicenseUpdateFailed = createAction(
  "userLicenses/userLicenseUpdateFailed"
);

const { reducer: userLicensesReducer, actions } = userLicensesSlice;
const {
  userLicensesRequested,
  userLicensesReceived,
  userLicensesFailed,
  userLicenseUpdateSuccessed
} = actions;

export const loadUserLicensesList = () => async (dispatch, getState) => {
  const { lastFetch } = getState().userLicenses;
  if (isOutDated(lastFetch)) {
    dispatch(userLicensesRequested());
    try {
      const { content } = await userLicenseService.get();
      dispatch(userLicensesReceived(content));
    } catch (error) {
      userLicensesFailed(error.message);
    }
  }
};

export const updateUserLicense = (payload) => async (dispatch) => {
  dispatch(userLicenseUpdateRequested());
  try {
    const { content } = await userLicenseService.update(payload);
    console.log("content", content);

    socket.emit("userLicenseUpdated", content);
  } catch (error) {
    const errorMessage = error.response.data.error.message;
    dispatch(userLicenseUpdateFailed(errorMessage));
    throw errorMessage;
  }
};

export const updateClicksOnMapInUserLicense = (payload) => async (dispatch) => {
  dispatch(userLicenseUpdateRequested());
  try {
    const { content } = await userLicenseService.updateClicksOnMap(payload);

    socket.emit("userLicenseUpdated", content);
  } catch (error) {
    const errorMessage = error.response.data.error.message;
    dispatch(userLicenseUpdateFailed(errorMessage));
    throw errorMessage;
  }
};

export const updateUserLicenseUpdate = (payload) => async (dispatch) => {
  dispatch(userLicenseUpdateRequested());
  try {
    dispatch(userLicenseUpdateSuccessed(payload));
  } catch (error) {
    dispatch(userLicenseUpdateFailed(error.message));
  }
};

export const getUserLicenseById = (id) => (state) => {
  if (state.userLicenses.entities) {
    return state.userLicenses.entities.find((user) => user._id === id);
  }
};

export const getUserLicensesByUserId = (userId) => (state) => {
  if (state.userLicenses.entities) {
    return state.userLicenses.entities.find((user) => user.userId === userId);
  }
};

export const getUserLicensesList = () => (state) => state.userLicenses.entities;

export const getUserLicenseLoadingStatus = () => (state) =>
  state.userLicenses.isLoading;

export const getDataUserLicensesStatus = () => (state) =>
  state.userLicenses.dataLoaded;

export default userLicensesReducer;
