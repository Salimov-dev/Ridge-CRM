import { io } from "socket.io-client";
import { createAction, createSlice } from "@reduxjs/toolkit";
// config
import configFile from "../../config.json";
// services
import localStorageService from "../../services/user/local.storage-service";
import avatarUploadService from "../../services/upload/avatar-upload.service";
import userService from "../../services/user/user.service";

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
    avatarUpdateSuccessed: (state, action) => {
      state.entities[
        state.entities.findIndex((obj) => obj._id === action.payload._id)
      ] = action.payload;
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
const { avatarReceived, avatarUpdateSuccessed } = actions;

export const loadAvatarList = () => async (dispatch) => {
  dispatch(avatarUploadRequested());
  try {
    const { content: userContent } = await userService.get();

    const usersArray = await Promise.all(
      userContent.map(async (user) => {
        const { content: avatarUploadContent } = await avatarUploadService.get(
          user._id
        );
        const serializedSrc = btoa(
          String.fromCharCode.apply(null, new Uint8Array(avatarUploadContent))
        );

        return { userId: user._id, src: serializedSrc };
      })
    );

    dispatch(avatarReceived(usersArray));
  } catch (error) {
    dispatch(avatarUploadFailed(error.message));
    throw error;
  }
};

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
    dispatch(avatarUpdateSuccessed(payload));
    socket.emit("avatarUpdated", payload);
  } catch (error) {
    dispatch(avatarUpdateFailed(error.message));
    throw error;
  }
};

export const getUserAvatarsList = () => (state) => state.avatar.entities;

export default avatarReducer;
