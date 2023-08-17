import { createAction, createSlice } from "@reduxjs/toolkit";
import localStorageService from "../services/local.storage-service";
import meetingsService from "../services/meetings.service";
import isOutDated from "../utils/is-out-date";

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
      if (!Array.isArray(state.entities)) {
        state.entities = [];
      }
      state.entities.push(action.payload);
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
    },
  },
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
  meetingRemoved,
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
      dispatch(meetingCreated(content));
    } catch (error) {
      dispatch(createMeetingFailed(error.message));
    }
  };
}

export const updateMeeting = (payload, meetingId) => async (dispatch) => {
  dispatch(meetingUpdateRequested());
  try {
    dispatch(meetingUpdateSuccessed(payload));
    await meetingsService.update(payload, meetingId);
  } catch (error) {
    dispatch(meetingUpdateFailed(error.message));
  }
};

export const removeMeeting = (meetingId) => async (dispatch) => {
  dispatch(removeMeetingRequested());
  try {
    dispatch(meetingRemoved(meetingId))
    await meetingsService.remove(meetingId);
  } catch (error) {
    dispatch(removeMeetingFailed(error.message));
  }
};
export const getMeetingsList = () => (state) => state.meetings.entities;
export const getMeetingLoadingStatus = () => (state) =>
  state.meetings.isLoading;
export const getDataMeetingsStatus = () => (state) => state.meetings.dataLoaded;
export const getMeetingById = (id) => (state) => {
  if (state.meetings.entities) {
    return state.meetings.entities.find((meet) => meet._id === id);
  }
};

export default meetingsReducer;
