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
      isUpdated: false,
      isLoggedIn: true,
      dataLoaded: false,
      lastFetch: null,
    }
  : {
      entities: null,
      isLoading: false,
      error: null,
      isUpdated: false,
      isLoggedIn: false,
      dataLoaded: false,
      lastFetch: null,
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
      state.dataLoaded = true;
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
      avatarIsUpdated: (state, action) => {
        const isUpdate = action.payload
        if(isUpdate) {

          state.isUpdated = false
          state.isUpdated = true
        }
      },
  },
});

const avatarUploadRequested = createAction("avatar/avatarUploadRequested");
const avatarUpdateRequested = createAction("avatar/avatarUpdateRequested");
const avatarUploadFailed = createAction("avatar/avatarUploadFailed");
const avatarUpdateFailed = createAction("avatar/avatarUpdateFailed");
const removeAvatarRequested = createAction("avatar/removeAvatarRequested");
const removeAvatarFailed = createAction("avatar/removeAvatarFailed");

const { reducer: avatarReducer, actions } = avatarSlice;
const {
  avatarRequested,
  avatarReceived,
  avatarFailed,
  avatarUploaded,
  avatarRemoved,
  avatarIsUpdated
} = actions;

export const loadAvatar = (userId) => async (dispatch) => {
  dispatch(avatarRequested());
  try {
    const { content } = await avatarUploadService.get(userId);

    return content;
  } catch (error) {
    dispatch(avatarFailed(error));
  }

};

export const updateUserAvatar = () => async (dispatch) => {
  try {
    dispatch(avatarIsUpdated(true));
  } catch (error) {
    dispatch(avatarFailed(error));
  }

};

export const loadAvatarsList = () => async (dispatch) => {
  dispatch(avatarRequested());
  try {
    const { content } = await avatarUploadService.getAll();
  } catch (error) {
    dispatch(avatarFailed(error));
  }
};

export const uploadAvatar = (payload) => async (dispatch) => {
  dispatch(avatarUploadRequested());
  try {
    await avatarUploadService.post(payload);
    // dispatch(avatarUploaded(payload))
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

export const updateAvatarUpdate = (payload) => async (dispatch) => {
  try {
    dispatch(avatarUploaded(payload));
  } catch (error) {
    dispatch(avatarUpdateFailed(error.message));
    throw error;
  }
};

// export const getAvatar = () => (state) => state.avatar.entities;
// export const getavatarLoadingStatus = () => (state) => state.avatar.isLoading;
// export const getDataavatarStatus = () => (state) => state.avatar.dataLoaded;

export default avatarReducer;
