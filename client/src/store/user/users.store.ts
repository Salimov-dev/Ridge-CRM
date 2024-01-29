import { io } from "socket.io-client";
import { createAction, createSlice } from "@reduxjs/toolkit";
// config
import configFile from "@config/config.json";
// service
import authService from "@services/user/auth-service";
import userService from "@services/user/user.service";
import localStorageService from "@services/user/local.storage-service";

const socket = io(configFile.ioEndPoint);

const initialState = {
  entities: [],
  isLoading: false,
  error: null,
  auth: null,
  isLoggedIn: false,
  dataLoaded: false,
};

const usersListSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    usersRequested: (state) => {
      state.isLoading = true;
    },
    usersReceived: (state, action) => {
      state.entities = action.payload;
      state.isLoading = false;
    },
    usersFailed: (state, action) => {
      state.entities = action.payload;
      state.isLoading = false;
    },
    authRequestSuccess: (state, action) => {
      state.auth = action.payload;
      state.isLoggedIn = true;
      state.dataLoaded = true;
    },
    authRequestFailed: (state, action) => {
      state.error = action.payload;
    },
    userCreated: (state, action) => {
      if (!Array.isArray(state.entities)) {
        state.entities = [];
      }
      state.entities.push(action.payload);
    },
    userLoggedOut: (state) => {
      state.entities = null;
      state.isLoggedIn = false;
      state.auth = null;
      state.dataLoaded = false;
    },
    userUpdateSuccessed: (state, action) => {
      state.entities[
        state.entities.findIndex((u) => u._id === action.payload._id)
      ] = action.payload;
    },
    authRequested: (state) => {
      state.error = null;
    },
  },
});

const { reducer: usersListReducer, actions } = usersListSlice;
const {
  usersRequested,
  usersReceived,
  usersFailed,
  authRequestFailed,
  authRequestSuccess,
  userLoggedOut,
  userUpdateSuccessed,
  userCreated,
} = actions;

const authRequested = createAction("users/authRequested");
const userUpdateFailed = createAction("users/userUpdateFailed");
const userUpdateRequested = createAction("users/userUpdateRequested");

export const login = (payload) => async (dispatch) => {
  dispatch(authRequested());
  try {
    const data = await authService.login(payload);

    localStorageService.setTokens(data);
    dispatch(authRequestSuccess({ userId: data.userId }));
    dispatch(loadUsersList());
  } catch (error) {
    dispatch(authRequestFailed(error.message));
  }
};

export const signUp = (payload) => async (dispatch) => {
  dispatch(authRequested());
  try {
    const registerData = await authService.register(payload);
    dispatch(userCreated(registerData));
    const data = await authService.login(payload);

    localStorageService.setTokens(data);
    dispatch(authRequestSuccess({ userId: data.userId }));
    dispatch(loadUsersList());
  } catch (error) {
    dispatch(authRequestFailed(error.message));
  }
};

export const logOut = () => (dispatch) => {
  localStorageService.removeAuthData();
  dispatch(userLoggedOut());
};

export const loadUsersList = () => async (dispatch) => {
  dispatch(usersRequested());
  try {
    const { content } = await userService.get();

    dispatch(usersReceived(content));
  } catch (error) {
    dispatch(usersFailed(error.message));
  }
};

export const createNewUser = (payload) => async (dispatch) => {
  dispatch(authRequested());
  try {
    await authService.register(payload);
    socket.emit("userCreated", payload);
  } catch (error) {
    dispatch(authRequestFailed(error.message));
  }
};

export const createNewUserUpdate = (payload) => async (dispatch) => {
  dispatch(authRequested());
  try {
    dispatch(userCreated(payload));
  } catch (error) {
    dispatch(authRequestFailed(error.message));
  }
};

export const updateUser = (payload) => async (dispatch) => {
  dispatch(userUpdateRequested());
  try {
    const { content } = await userService.update(payload);
    socket.emit("userUpdated", content);
  } catch (error) {
    dispatch(userUpdateFailed(error.message));
  }
};

export const updateUserUpdate = (payload) => async (dispatch) => {
  dispatch(userUpdateRequested());
  try {
    dispatch(userUpdateSuccessed(payload));
  } catch (error) {
    dispatch(userUpdateFailed(error.message));
  }
};

export const getUsersList = () => (state) => state?.users?.entities;

export const getCurrentUserData = () => (state) => {
  return state?.users?.entities
    ? state?.users?.entities?.find((u) => u?._id === state?.users?.auth?.userId)
    : null;
};

export const getUserNameById = (id) => (state) => {
  if (state?.users?.entities) {
    const user = state?.users?.entities.find((user) => user._id === id);
    const isFullName = user?.lastName && user?.firstName;
    const result = `${user?.lastName} ${user?.firstName}`;

    return isFullName ? result : "Новенький";
  }
  return;
};

export const getUserDataById = (id) => (state) => {
  if (state?.users?.entities) {
    const user = state.users.entities.find((user) => user._id === id);

    return user;
  }
};

export const getIsUserManager = (userId) => (state) => {
  const user = state.users.entities?.find((user) => user?._id === userId);
  const isManager = user?.role === "MANAGER";
  return isManager;
};

export const getIsUserCurator = (userId) => (state) => {
  const user = state?.users?.entities?.find((user) => user?._id === userId);

  const isCurator = user?.role?.includes("CURATOR") || false;

  return isCurator;
};

export const getIsUserAuthorThisEntity = (userId, entity) => (state) => {
  const user = state.users.entities?.find((user) => user?._id === userId);
  const isUserAuthorThisEntity = entity?.userId === user?._id;
  return isUserAuthorThisEntity;
};

export const getIsLoggedIn = () => (state) => state.users.isLoggedIn;
export const getDataStatus = () => (state) => state.users.dataLoaded;
export const getUsersLoadingStatus = () => (state) => state.users.isLoading;
export const getCurrentUserId = () => (state) => state?.users?.auth?.userId;
export const getAuthErrors = () => (state) => state.users.error;

export default usersListReducer;
