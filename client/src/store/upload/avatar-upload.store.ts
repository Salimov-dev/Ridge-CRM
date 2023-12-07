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
  },
});

const avatarUploadRequested = createAction("avatar/avatarUploadRequested");
const avatarUploadFailed = createAction("avatar/avatarUploadFailed");
const removeAvatarRequested = createAction("avatar/removeAvatarRequested");
const removeAvatarFailed = createAction("avatar/removeAvatarFailed");

const { reducer: avatarReducer, actions } = avatarSlice;
const {
  avatarRequested,
  avatarReceived,
  avatarFailed,
  avatarUploaded,
  avatarRemoved,
} = actions;

export const loadAvatar = (userId) => async (dispatch, getState) => {
  const { lastFetch } = getState().avatar;
  if (isOutDated(lastFetch)) {
    // dispatch(avatarRequested());
    try {

      
      const { content } = await avatarUploadService.get(userId);
      console.log("content", content);
      
      dispatch(avatarReceived(content));
    } catch (error) {
      dispatch(avatarFailed(error));
      
    }
  }
};

export const uploadAvatar = (payload) => async (dispatch) => {
  dispatch(avatarUploadRequested());
  try {
    await avatarUploadService.post(payload);
    // dispatch(avatarUploaded(payload))
  } catch (error) {
    dispatch(avatarUploadFailed(error.message));
    throw error
  }
}

export const updateAvatar = (payload) => async (dispatch) => {
  dispatch(avatarUploadRequested());
  try {    
    // console.log("payload", payload.preview);
    
    await avatarUploadService.update(payload);
    // dispatch(avatarUploaded(payload))
  } catch (error) {
    dispatch(avatarUploadFailed(error.message));
    throw error
  }
}

// export function uploadAvatar(payload) {
//   return async function (dispatch) {
//     dispatch(avatarUploadRequested());
//     try {
//       await avatarUploadService.post(payload);
//       // dispatch(avatarUploaded(payload))
//     } catch (error) {
//       dispatch(avatarUploadFailed(error.message));
//       throw error
//     }
//   };
// }

// export function createavatarUpdate(payload) {
//   return async function (dispatch) {
//     dispatch(avatarCreateRequested());
//     try {
//       dispatch(avatarCreated(payload));
//     } catch (error) {
//       dispatch(createavatarFailed(error.message));
//     }
//   };
// }

// export const updateavatar = (payload) => async (dispatch) => {
//   dispatch(avatarUpdateRequested());
//   try {
//     await avatarService.update(payload);
//     socket.emit("avatarUpdated", payload);
//   } catch (error) {
//     dispatch(avatarUpdateFailed(error.message));
//   }
// };

// export const updateavatarUpdate = (payload) => async (dispatch) => {
//   dispatch(avatarUpdateRequested());
//   try {
//     dispatch(avatarUpdateSuccessed(payload));
//   } catch (error) {
//     dispatch(avatarUpdateFailed(error.message));
//   }
// };

// export const removeavatar = (avatarId) => async (dispatch) => {
//   dispatch(removeavatarRequested());
//   try {
//     await avatarService.remove(avatarId);
//     socket.emit("avatarDeleted", avatarId);
//   } catch (error) {
//     dispatch(removeavatarFailed(error.message));
//   }
// };

// export const removeavatarUpdate = (avatarId) => async (dispatch) => {
//   dispatch(removeavatarRequested());
//   try {
//     dispatch(avatarRemoved(avatarId));
//   } catch (error) {
//     dispatch(removeavatarFailed(error.message));
//   }
// };

// export const getObjectavatarList = (objectId) =>
//   createSelector(
//     (state) => state?.avatar?.entities,
//     (avatar) => avatar?.filter((avatar) => avatar?.objectId === objectId)
//   );

// export const getavatarByObjectId = (objectId) => (state) => {
//   const avatar = state?.avatar.entities;
//   const objectavatar = avatar?.filter((avatar) => avatar.objectId === objectId);
//   return objectavatar;
// };

// export const getavatarById = (id) => (state) => {
//   if (state.avatar.entities) {
//     return state.avatar.entities.find((avatar) => avatar._id === id);
//   }
// };

export const getAvatar = () => (state) => state.avatar.entities;
// export const getavatarLoadingStatus = () => (state) => state.avatar.isLoading;
// export const getDataavatarStatus = () => (state) => state.avatar.dataLoaded;

export default avatarReducer;
