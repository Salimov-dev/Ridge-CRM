import { io } from "socket.io-client";
import { createAction, createSlice } from "@reduxjs/toolkit";
// config
import configFile from "@config/config.json";
// service
import authService from "@services/user/auth-service";
import userService from "@services/user/user.service";
import localStorageService from "@services/user/local.storage-service";
import { loadUserLicensesList } from "./user-license.store";
import { roleCuratorId, roleManagerId } from "@data/users/user-roles";

const socket = io(configFile.ioEndPoint);

const initialState = localStorageService.getAccessToken()
  ? {
      entities: [],
      isLoading: true,
      error: null,
      auth: { userId: localStorageService.getUserId() },
      isLoggedIn: true,
      dataLoaded: false
    }
  : {
      entities: [],
      isLoading: false,
      error: null,
      auth: null,
      isLoggedIn: false,
      dataLoaded: false
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
    authRequested: (state) => {
      state.error = null;
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
      const newUser = action.payload;

      return {
        ...state,
        entities: [...state.entities, newUser]
      };
    },
    userLoggedOut: (state) => {
      state.entities = [];
      state.isLoggedIn = false;
      state.auth = null;
      state.dataLoaded = false;
    },
    userUpdateSuccessed: (state, action) => {
      state.entities[
        state.entities.findIndex((u) => u._id === action.payload._id)
      ] = action.payload;
    },
    teammateUpdateSuccessed: (state, action) => {
      state.entities[
        state.entities.findIndex((u) => u._id === action.payload._id)
      ] = action.payload;
    }
  }
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
  teammateUpdateSuccessed,
  userCreated
} = actions;

const authRequested = createAction("users/authRequested");
const userUpdateFailed = createAction("users/userUpdateFailed");
const teammateUpdateFailed = createAction("users/teammateUpdateFailed");
const userUpdateRequested = createAction("users/userUpdateRequested");
const teammateUpdateRequested = createAction("users/teammateUpdateRequested");

export const login = (payload) => async (dispatch) => {
  dispatch(authRequested());
  try {
    const data = await authService.login(payload);

    localStorageService.setTokens(data);
    dispatch(authRequestSuccess({ userId: data.userId }));
    dispatch(loadUsersList());
  } catch (error) {
    const errorMessage = error.response.data.error.message;

    dispatch(authRequestFailed(errorMessage));
    throw errorMessage;
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
    const errorMessage = error.response.data.error.message;

    dispatch(authRequestFailed(errorMessage));
    throw errorMessage;
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
    const errorMessage = error.response.data.error.message;

    dispatch(usersFailed(errorMessage));
    throw errorMessage;
  }
};

export const createNewUser = (payload) => async (dispatch) => {
  dispatch(authRequested());
  try {
    const { content } = await userService.createTeammate(payload);

    dispatch(userCreated(content));
    dispatch(loadUserLicensesList());
  } catch (error) {
    const errorMessage = error.response.data.error.message;

    dispatch(authRequestFailed(errorMessage));
    throw errorMessage;
  }
};

export const updateUser = (payload) => async (dispatch) => {
  dispatch(userUpdateRequested());
  try {
    const { content } = await userService.update(payload);
    socket.emit("userUpdated", content);
  } catch (error) {
    const errorMessage = error.response.data.error.message;

    dispatch(userUpdateFailed(errorMessage));
    throw errorMessage;
  }
};

export const updateUserUpdate = (payload) => async (dispatch) => {
  dispatch(userUpdateRequested());
  try {
    dispatch(userUpdateSuccessed(payload));
  } catch (error) {
    const errorMessage = error.response.data.error.message;

    dispatch(userUpdateFailed(errorMessage));
    throw errorMessage;
  }
};

export const updateTeammate = (payload) => async (dispatch) => {
  dispatch(teammateUpdateRequested());
  try {
    const { content } = await userService.updateTeammate(payload);

    socket.emit("userLicenseUpdated", content?.updatedLicense);
    socket.emit("teammateUpdated", content?.updatedUser);
  } catch (error) {
    const errorMessage = error.response.data.error.message;

    dispatch(teammateUpdateFailed(errorMessage));
    throw errorMessage;
  }
};

export const updateTeammateUpdate = (payload) => async (dispatch) => {
  dispatch(teammateUpdateRequested());
  try {
    dispatch(teammateUpdateSuccessed(payload));
  } catch (error) {
    const errorMessage = error.response.data.error.message;

    dispatch(teammateUpdateFailed(errorMessage));
    throw errorMessage;
  }
};

export const updatePassword = (payload) => async (dispatch) => {
  dispatch(authRequested());
  try {
    const { currentPassword, newPassword } = payload;
    await userService.updatePassword({ currentPassword, newPassword });
  } catch (error) {
    const errorMessage = error.response.data.error.message;

    dispatch(authRequestFailed(errorMessage));
    throw errorMessage;
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

export const getIsCurrentUserRoleManager = () => (state) => {
  const currentUserData = state?.users?.entities?.find(
    (u) => u?._id === state?.users?.auth?.userId
  );
  const currentUserRole = currentUserData?.role;
  const isUserRoleManager = currentUserRole?.includes(roleManagerId);

  return isUserRoleManager;
};

export const getIsCurrentUserRoleCurator = () => (state) => {
  const currentUserData = state?.users?.entities?.find(
    (u) => u?._id === state?.users?.auth?.userId
  );
  const currentUserRole = currentUserData?.role;
  const isUserRoleManager = currentUserRole?.includes(roleCuratorId);

  return isUserRoleManager;
};

export const getIsUserManager = (userId) => (state) => {
  const user = state.users.entities?.find((user) => user?._id === userId);
  const userRole = user?.role;

  const roleManager = "69gfoep3944jgjdso345002";
  const isManager = userRole?.includes(roleManager);

  return isManager;
};

export const getIsUserCurator = (userId) => (state) => {
  const user = state.users.entities?.find((user) => user?._id === userId);
  const userRole = user?.role;

  const roleCurator = "69gfoep3944jgjdso345003";
  const isCurator = userRole?.includes(roleCurator);

  return isCurator;
};

export const getIsUserObserver = (userId) => (state) => {
  const user = state.users.entities?.find((user) => user?._id === userId);
  const userRole = user?.role;

  const roleCurator = "69dgp34954igfj345043001";
  const isObserver = userRole?.includes(roleCurator);

  return isObserver;
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
