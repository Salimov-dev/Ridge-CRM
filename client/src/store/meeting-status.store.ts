import { createSlice } from "@reduxjs/toolkit";
import meetingStatusService from "../services/meeting-status.service";
import isOutDated from "../utils/is-out-date";

const meetingStatusSlice = createSlice({
  name: "meetingStatus",
  initialState: {
    entities: null,
    isLoading: true,
    error: null,
    lastFetch: null,
  },
  reducers: {
    meetingStatusRequested: (state) => {
      state.isLoading = true;
    },
    meetingStatusReceived: (state, action) => {
      state.entities = action.payload;
      state.isLoading = false;
    },
    meetingStatusFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

const { reducer: meetingStatusReducer, actions } = meetingStatusSlice;
const { meetingStatusRequested, meetingStatusReceived, meetingStatusFailed } =
  actions;

export const loadMeetingStatusList = () => async (dispatch, getState) => {
  const { lastFetch } = getState().workingPosition;
  if (isOutDated(lastFetch)) {
    dispatch(meetingStatusRequested());
    try {
      const { content } = await meetingStatusService.get();
      dispatch(meetingStatusReceived(content));
    } catch (error) {
      meetingStatusFailed(error.message);
    }
  }
};

export const getMeetingStatus = () => (state) => state.meetingStatus.entities;

export const getMeetingStatusLoadingStatus = () => (state) =>
  state.meetingStatus.isLoading;

export const getMeetingStatusById = (id) => (state) => {
  if (state.meetingStatus.entities) {
    return state.meetingStatus.entities.find((meet) => meet._id === id);
  }
};

export default meetingStatusReducer;
