import { io } from "socket.io-client";
import { Dispatch, createAction, createSlice } from "@reduxjs/toolkit";
// config
import configFile from "@config/config.json";
// data
import { roleCuratorId, roleManagerId } from "@data/users/user-roles";
// service
import authService from "@services/auth/auth-service";
import userService from "@services/user/user.service";
import localStorageService from "@services/local-storage/local.storage-service";
// store
import { loadUserLicensesList } from "@store/license/user-license.store";
// types
import { IUser } from "src/types/user/user.types";
import { ILogin } from "src/types/auth/login.types";
import { IRegister } from "src/types/auth/register.types";
import { IPasswordUpdate } from "src/types/password/password-update.types";

const socket = io(configFile.ioEndPoint);

interface IUserStoreInitialState {
  entities: IUser[];
  isLoading: boolean;
  error: any;
  auth: { userId: string | null };
  isLoggedIn: boolean;
  dataLoaded: boolean;
}

export interface IStoreState {
  users: IUserStoreInitialState;
}

const initialState: IUserStoreInitialState =
  localStorageService.getAccessToken()
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
        auth: { userId: null },
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
      state.auth = { userId: null };
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

export const login = (payload: ILogin) => async (dispatch: Dispatch) => {
  dispatch(authRequested());
  try {
    const data = await authService.login(payload);

    localStorageService.setTokens(data);
    dispatch(authRequestSuccess({ userId: data.userId }));
    loadUsersList();
  } catch (error: any) {
    const errorMessage = error.response.data.error.message;

    dispatch(authRequestFailed(errorMessage));
    throw errorMessage;
  }
};

export const signUp = (payload: IRegister) => async (dispatch: Dispatch) => {
  dispatch(authRequested());
  try {
    const registerData = await authService.register(payload);

    dispatch(userCreated(registerData));
    const data = await authService.login(payload);

    localStorageService.setTokens(data);
    dispatch(authRequestSuccess({ userId: data.userId }));
    loadUsersList();
  } catch (error: any) {
    const errorMessage = error.response.data.error.message;

    dispatch(authRequestFailed(errorMessage));
    throw errorMessage;
  }
};

export const logOut = () => (dispatch: Dispatch) => {
  localStorageService.removeAuthData();
  dispatch(userLoggedOut());
};

export const loadUsersList = () => async (dispatch: Dispatch) => {
  dispatch(usersRequested());
  try {
    const { content } = await userService.get();

    dispatch(usersReceived(content));
  } catch (error: any) {
    const errorMessage = error.response.data.error.message;

    dispatch(usersFailed(errorMessage));
    throw errorMessage;
  }
};

export const createNewUser = (payload: IUser) => async (dispatch: Dispatch) => {
  dispatch(authRequested());
  try {
    const { content } = await userService.createTeammate(payload);

    dispatch(userCreated(content));
    loadUserLicensesList();
  } catch (error: any) {
    const errorMessage = error.response.data.error.message;

    dispatch(authRequestFailed(errorMessage));
    throw errorMessage;
  }
};

export const updateUser = (payload: IUser) => async (dispatch: Dispatch) => {
  dispatch(userUpdateRequested());
  try {
    const { content } = await userService.update(payload);
    socket.emit("userUpdated", content);
  } catch (error: any) {
    const errorMessage = error.response.data.error.message;

    dispatch(userUpdateFailed(errorMessage));
    throw errorMessage;
  }
};

export const updateUserUpdate =
  (payload: IUser) => async (dispatch: Dispatch) => {
    dispatch(userUpdateRequested());
    try {
      dispatch(userUpdateSuccessed(payload));
    } catch (error: any) {
      const errorMessage = error.response.data.error.message;

      dispatch(userUpdateFailed(errorMessage));
      throw errorMessage;
    }
  };

export const updateTeammate =
  (payload: IUser) => async (dispatch: Dispatch) => {
    dispatch(teammateUpdateRequested());
    try {
      const { content } = await userService.updateTeammate(payload);

      socket.emit("userLicenseUpdated", content?.updatedLicense);
      socket.emit("teammateUpdated", content?.updatedUser);
    } catch (error: any) {
      const errorMessage = error.response.data.error.message;

      dispatch(teammateUpdateFailed(errorMessage));
      throw errorMessage;
    }
  };

export const updateTeammateUpdate =
  (payload: IUser) => async (dispatch: Dispatch) => {
    dispatch(teammateUpdateRequested());
    try {
      dispatch(teammateUpdateSuccessed(payload));
    } catch (error: any) {
      const errorMessage = error.response.data.error.message;

      dispatch(teammateUpdateFailed(errorMessage));
      throw errorMessage;
    }
  };

export const updatePassword =
  (payload: IPasswordUpdate) => async (dispatch: Dispatch) => {
    dispatch(authRequested());
    try {
      const { currentPassword, newPassword } = payload;
      await userService.updatePassword({ currentPassword, newPassword });
    } catch (error: any) {
      const errorMessage = error.response.data.error.message;

      dispatch(authRequestFailed(errorMessage));
      throw errorMessage;
    }
  };

export const getUsersList = () => (state: IStoreState) =>
  state?.users?.entities;

export const getCurrentUserData = () => (state: IStoreState) => {
  return state?.users?.entities
    ? state?.users?.entities?.find((u) => u?._id === state?.users?.auth?.userId)
    : null;
};

export const getUserNameById = (userId: string) => (state: IStoreState) => {
  if (state?.users?.entities) {
    const user = state?.users?.entities.find((user) => user._id === userId);
    const isFullName = user?.lastName && user?.firstName;
    const result = `${user?.lastName} ${user?.firstName}`;

    return isFullName ? result : "Новенький";
  }
  return;
};

export const getUserDataById = (userId: string) => (state: IStoreState) => {
  if (state?.users?.entities) {
    const user = state.users.entities.find((user) => user._id === userId);

    return user;
  }
};

export const getIsCurrentUserRoleManager =
  () =>
  (state: IStoreState): boolean => {
    const currentUserData = state?.users?.entities?.find(
      (u) => u?._id === state?.users?.auth?.userId
    );

    if (currentUserData) {
      const currentUserRole = currentUserData?.role;
      const isUserRoleManager = currentUserRole?.includes(roleManagerId);
      return isUserRoleManager;
    }

    return false;
  };

export const getIsCurrentUserRoleCurator =
  () =>
  (state: IStoreState): boolean => {
    const currentUserData = state?.users?.entities?.find(
      (u) => u?._id === state?.users?.auth?.userId
    );

    if (currentUserData) {
      const currentUserRole = currentUserData?.role;
      const isUserRoleManager = currentUserRole?.includes(roleCuratorId);
      return isUserRoleManager;
    }

    return false;
  };

export const getIsUserManager = (userId: string) => (state: IStoreState) => {
  const user = state.users.entities?.find((user) => user?._id === userId);
  const userRole = user?.role;

  const roleManager = "69gfoep3944jgjdso345002";
  const isManager = userRole?.includes(roleManager);

  return isManager;
};

export const getIsUserCurator = (userId: string) => (state: IStoreState) => {
  const user = state.users.entities?.find((user) => user?._id === userId);
  const userRole = user?.role;

  const roleCurator = "69gfoep3944jgjdso345003";
  const isCurator = userRole?.includes(roleCurator);

  return isCurator;
};

export const getIsUserObserver = (userId: string) => (state: IStoreState) => {
  const user = state.users.entities?.find(
    (user: IUser) => user?._id === userId
  );
  const userRole = user?.role;

  const roleCurator = "69dgp34954igfj345043001";
  const isObserver = userRole?.includes(roleCurator);

  return isObserver;
};

export const getIsUserAuthorThisEntity =
  (userId: string, entity: any) => (state: IStoreState) => {
    const user = state.users.entities?.find(
      (user: IUser) => user?._id === userId
    );
    const isUserAuthorThisEntity = entity?.userId === user?._id;
    return isUserAuthorThisEntity;
  };

export const getIsLoggedIn = () => (state: IStoreState) =>
  state.users.isLoggedIn;
export const getDataStatus = () => (state: IStoreState) =>
  state.users.dataLoaded;
export const getUsersLoadingStatus = () => (state: IStoreState) =>
  state.users.isLoading;
export const getCurrentUserId = () => (state: IStoreState) =>
  state?.users?.auth?.userId;
export const getAuthErrors = () => (state: IStoreState) => state.users.error;

export default usersListReducer;
