import { createAction, createSlice } from "@reduxjs/toolkit";
// utils
import { generetaAuthError } from "../utils/generate-auth-error";
// service
import authService from "../services/auth-service";
import userService from "../services/user.service";
import localStorageService from "../services/local.storage-service";

const initialState = localStorageService.getAccessToken()
  ? {
      entities: [],
      isLoading: true,
      error: null,
      auth: { userId: localStorageService.getUserId() },
      isLoggedIn: true,
      dataLoaded: false,
    }
  : {
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
    },
    authRequestFailed: (state, action) => {
      state.error = action.payload;
    },
    userCreated: (state, action) => {
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
} = actions;

const authRequested = createAction("users/authRequested");
const userUpdateFailed = createAction("users/userUpdateFailed");
const userUpdateRequested = createAction("users/userUpdateRequested");

export const login =
  ({ payload }) =>
  async (dispatch) => {
    const { email, password } = payload;

    dispatch(authRequested());
    try {
      const data = await authService.login({ email, password });
      localStorageService.setTokens(data);

      dispatch(authRequestSuccess({ userId: data.userId }));
      dispatch(loadUsersList());
    } catch (error) {
      const { code, message } = error.response.data.error;
      if (code === 400) {
        const errorMessage = generetaAuthError(message);
        dispatch(authRequestFailed(errorMessage));
      } else {
        dispatch(authRequestFailed(error.message));
      }
    }
  };

export const signUp = (payload) => async (dispatch) => {
  dispatch(authRequested());
  try {
    const data = await authService.register(payload);
    localStorageService.setTokens(data);
    dispatch(authRequestSuccess({ userId: data.userId }));
    dispatch(loadUsersList());
  } catch (error) {
    dispatch(authRequestFailed(error.message));
  }
};

export const addNewManager = (payload) => async (dispatch) => {
  dispatch(authRequested());
  try {
    await authService.register(payload);
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

export const updateUser = (payload) => async (dispatch) => {
  dispatch(userUpdateRequested());
  
  try {
    const { content } = await userService.update(payload);

    dispatch(userUpdateSuccessed(content));
  } catch (error) {
    dispatch(userUpdateFailed(error.message));
  }
};

export const getCurrentUserData = () => (state) => {
  return state?.users?.entities
    ? state?.users?.entities?.find((u) => u?._id === state?.users?.auth?.userId)
    : null;
};

export const getUserNameById = (id) => (state) => {
  if (state?.users?.entities) {
    const user = state.users.entities.find((user) => user._id === id);
    const result = `${user?.name.lastName} ${user?.name.firstName}`;

    return result;
  }
};

export const getUserDataById = (id) => (state) => {
  if (state?.users?.entities) {
    const user = state.users.entities.find((user) => user._id === id);

    return user;
  }
};

export const getUsersList = () => (state) => state?.users?.entities;

export const getIsLoggedIn = () => (state) => state.users.isLoggedIn;
export const getDataStatus = () => (state) => state.users.dataLoaded;
export const getUsersLoadingStatus = () => (state) => state.users.isLoading;
export const getCurrentUserId = () => (state) => state.users.auth.userId;
export const getAuthErrors = () => (state) => state.users.error;

export default usersListReducer;
