import { io } from "socket.io-client";
import { createSelector } from "reselect";
import { createAction, createSlice } from "@reduxjs/toolkit";
// utils
import isOutDated from "@utils/auth/is-out-date";
// services
import localStorageService from "@services/local-storage/local.storage-service";
import meetingsService from "@services/meeting/meetings.service";
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

const meetingsSlice = createSlice({
  name: "meetings",
  initialState,
  reducers: {
    meetingsRequested: (state) => {
      state.isLoading = true;
    },
    meetingsReceived: (state, action) => {
      state.entities = action.payload;
      state.dataLoaded = true;
      state.isLoading = false;
    },
    meetingsFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    meetingCreated: (state, action) => {
      const newMeeting = action.payload;
      if (!state.entities.some((meeting) => meeting._id === newMeeting._id)) {
        state.entities.push(newMeeting);
      }
    },
    meetingUpdateSuccessed: (state, action) => {
      state.entities[
        state.entities.findIndex((m) => m._id === action.payload._id)
      ] = action.payload;
    },
    meetingRemoved: (state, action) => {
      state.entities = state.entities.filter(
        (meet) => meet._id !== action.payload
      );
    }
  }
});

const meetingCreateRequested = createAction("meetings/meetingCreateRequested");
const createMeetingFailed = createAction("meetings/createMeetingFailed");
const meetingUpdateRequested = createAction("meetings/meetingUpdateRequested");
const meetingUpdateFailed = createAction("meetings/meetingUpdateFailed");
const removeMeetingRequested = createAction("meetings/removeMeetingRequested");
const removeMeetingFailed = createAction("meetings/removeMeetingFailed");

const { reducer: meetingsReducer, actions } = meetingsSlice;
const {
  meetingsRequested,
  meetingsReceived,
  meetingsFailed,
  meetingCreated,
  meetingUpdateSuccessed,
  meetingRemoved
} = actions;

export const loadMeetingsList = () => async (dispatch, getState) => {
  const { lastFetch } = getState().meetings;
  if (isOutDated(lastFetch)) {
    dispatch(meetingsRequested());
    try {
      const { content } = await meetingsService.get();
      dispatch(meetingsReceived(content));
    } catch (error) {
      meetingsFailed(error.message);
    }
  }
};

export function createMeeting(payload) {
  return async function (dispatch) {
    dispatch(meetingCreateRequested());
    try {
      const { content } = await meetingsService.create(payload);
      socket.emit("meetingCreated", content);
    } catch (error) {
      dispatch(createMeetingFailed(error.message));
    }
  };
}

export function createMeetingUpdate(payload) {
  return async function (dispatch) {
    dispatch(meetingCreateRequested());
    try {
      dispatch(meetingCreated(payload));
    } catch (error) {
      dispatch(createMeetingFailed(error.message));
    }
  };
}

export const updateMeeting = (payload) => async (dispatch) => {
  dispatch(meetingUpdateRequested());
  try {
    await meetingsService.update(payload);
    socket.emit("meetingUpdated", payload);
  } catch (error) {
    dispatch(meetingUpdateFailed(error.message));
  }
};

export const updateMeetingUpdate = (payload) => async (dispatch) => {
  dispatch(meetingUpdateRequested());
  try {
    dispatch(meetingUpdateSuccessed(payload));
  } catch (error) {
    dispatch(meetingUpdateFailed(error.message));
  }
};

export const removeMeeting = (meetingId) => async (dispatch) => {
  dispatch(removeMeetingRequested());
  try {
    await meetingsService.remove(meetingId);
    socket.emit("meetingDeleted", meetingId);
  } catch (error) {
    dispatch(removeMeetingFailed(error.message));
  }
};

export const removeMeetingUpdate = (meetingId) => async (dispatch) => {
  dispatch(removeMeetingRequested());
  try {
    dispatch(meetingRemoved(meetingId));
  } catch (error) {
    dispatch(removeMeetingFailed(error.message));
  }
};

export const getObjectMeetingsList = (objectId) =>
  createSelector(
    (state) => state?.meetings?.entities,
    (meetings) => meetings?.filter((meet) => meet?.objectId === objectId)
  );

export const getMeetingById = (id) => (state) => {
  if (state.meetings.entities) {
    return state.meetings.entities.find((meet) => meet._id === id);
  }
};

export const getMeetingsByObjectId = (objectId) => (state) => {
  if (state.meetings.entities) {
    return state.meetings.entities.filter((meet) => meet.objectId === objectId);
  }
};

export const getMeetingsList = () => (state) => state.meetings.entities;

export const getMeetingLoadingStatus = () => (state) =>
  state.meetings.isLoading;

export const getDataMeetingsStatus = () => (state) => state.meetings.dataLoaded;

export default meetingsReducer;
