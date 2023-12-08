import { io } from "socket.io-client";
import { createAction, createSelector, createSlice } from "@reduxjs/toolkit";
// utils
import isOutDated from "../../utils/auth/is-out-date";
// services
import localStorageService from "../../services/user/local.storage-service";
import avatarUploadService from "../../services/upload/avatart-upload.service";
// config
import configFile from "../../config.json";

const socket = io(configFile.ioEndPoint);

const initialState = localStorageService.getAccessToken()
  ? {
      entities: null,
      isLoading: true,
      error: null,

    }
  : {
      entities: null,
      isLoading: false,
      error: null,

    };

const avatarSlice = createSlice({
  name: "avatar",
  initialState,
  reducers: {
    avatarRequested: (state) => {
      state.isLoading = true;
    },
    avatarReceived: (state, action) => {
      state.entities = action.payload;
      state.isLoading = false;
    },
    avatarFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    avatarUploaded: (state, action) => {
      state.entities = action.payload;
    },
    avatarRemoved: (state, action) => {
      // state.entities = state.entities.filter(
      //   (meet) => meet._id !== action.payload
      // );
    },
  },
});

const avatarUploadRequested = createAction("avatar/avatarUploadRequested");
const avatarUpdateRequested = createAction("avatar/avatarUpdateRequested");
const avatarUploadFailed = createAction("avatar/avatarUploadFailed");
const avatarUpdateFailed = createAction("avatar/avatarUpdateFailed");

const { reducer: avatarReducer, actions } = avatarSlice;
const {} = actions;

export const uploadAvatar = (payload) => async (dispatch) => {
  dispatch(avatarUploadRequested());
  try {
    await avatarUploadService.post(payload);
  } catch (error) {
    dispatch(avatarUploadFailed(error.message));
    throw error;
  }
};

export const updateAvatar = (payload) => async (dispatch) => {
  dispatch(avatarUpdateRequested());
  try {
    await avatarUploadService.update(payload);
    socket.emit("avatarUpdated", payload);
  } catch (error) {
    dispatch(avatarUpdateFailed(error.message));
    throw error;
  }
};

export default avatarReducer;
