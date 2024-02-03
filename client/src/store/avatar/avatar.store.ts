import { io } from "socket.io-client";
import { createAction, createSlice } from "@reduxjs/toolkit";
// config
import configFile from "@config/config.json";
// services
import localStorageService from "@services/user/local.storage-service";
import avatarService from "@services/avatar/avatar.service";
import userService from "@services/user/user.service";

const socket = io(configFile.ioEndPoint);

const initialState = localStorageService.getAccessToken()
  ? {
      entities: null,
      isLoading: true,
      error: null
    }
  : {
      entities: null,
      isLoading: false,
      error: null
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
    avatarUpdateSuccessed: (state, action) => {
      state.entities[
        state.entities.findIndex((item) => {
          return item.userId === action.payload.userId;
        })
      ] = action.payload;
      state.isLoading = false;
    },
    avatarRemoved: (state, action) => {
      state.entities = state.entities.filter(
        (item) => item.userId !== action.payload
      );
    }
  }
});

const avatarUploadRequested = createAction("avatar/avatarUploadRequested");
const avatarUpdateRequested = createAction("avatar/avatarUpdateRequested");
const avatarUploadFailed = createAction("avatar/avatarUploadFailed");
const avatarUpdateFailed = createAction("avatar/avatarUpdateFailed");
const removeAvatarRequested = createAction("avatar/removeAvatarRequested");
const removeAvatarFailed = createAction("avatar/removeAvatarFailed");

const { reducer: avatarReducer, actions } = avatarSlice;
const { avatarReceived, avatarUpdateSuccessed, avatarRemoved } = actions;

export const loadAvatarList = () => async (dispatch) => {
  dispatch(avatarUploadRequested());
  try {
    const { content: userContent } = await userService.get();

    const usersArray = [];

    for (const user of userContent) {
      const { content: avatarUploadContent } = await avatarService.get(
        user._id
      );
      const serializedSrc = btoa(
        String.fromCharCode.apply(null, new Uint8Array(avatarUploadContent))
      );

      usersArray.push({ userId: user._id, src: serializedSrc });
    }

    dispatch(avatarReceived(usersArray));
  } catch (error) {
    dispatch(avatarUploadFailed(error.message));
    throw error;
  }
};

export const updateAvatar = (payload) => async (dispatch) => {
  dispatch(avatarUpdateRequested());
  try {
    await avatarService.update(payload);
    socket.emit("avatarUpdated", payload);
  } catch (error) {
    dispatch(avatarUpdateFailed(error.message));
    throw error;
  }
};

export const updateAvatarUpdate = (payload) => async (dispatch, getState) => {
  const currentState = getState();

  if (currentState.avatar.entities) {
    const existingAvatar = currentState.avatar.entities.find(
      (item) => item.userId === payload.userId
    );

    // Проверяем, нужно ли обновлять сущность
    if (!existingAvatar || existingAvatar !== payload) {
      dispatch(avatarUpdateSuccessed(payload));
    }
  }
};

export const removeAvatar = (userId) => async (dispatch) => {
  dispatch(removeAvatarRequested());
  try {
    await avatarService.remove(userId);
    socket.emit("avatarDeleted", userId);
  } catch (error) {
    dispatch(removeAvatarFailed(error.message));
  }
};

export const removeAvatartUpdate = (userId) => async (dispatch) => {
  dispatch(removeAvatarRequested());
  try {
    dispatch(avatarRemoved(userId));
  } catch (error) {
    dispatch(avatarUpdateFailed(error.message));
  }
};

export const getUserAvatarsList = () => (state) => state.avatar.entities;
export const getUserAvatarsLoadingStatus = () => (state) =>
  state.avatar.isLoading;

export default avatarReducer;
