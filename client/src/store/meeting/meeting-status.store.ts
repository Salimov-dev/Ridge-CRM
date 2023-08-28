import { createSlice } from "@reduxjs/toolkit";
import meetingStatusesService from "../../services/meeting/meeting-status.service";
import isOutDated from "../../utils/is-out-date";

const meetingStatusesSlice = createSlice({
  name: "meetingStatuses",
  initialState: {
    entities: null,
    isLoading: true,
    error: null,
    lastFetch: null,
  },
  reducers: {
    meetingStatusesRequested: (state) => {
      state.isLoading = true;
    },
    meetingStatusesReceived: (state, action) => {
      state.entities = action.payload;
      state.isLoading = false;
    },
    meetingStatusesFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

const { reducer: meetingStatusesReducer, actions } = meetingStatusesSlice;
const {
  meetingStatusesRequested,
  meetingStatusesReceived,
  meetingStatusesFailed,
} = actions;

export const loadMeetingStatusesList = () => async (dispatch, getState) => {
  const { lastFetch } = getState().meetingStatuses;
  if (isOutDated(lastFetch)) {
    dispatch(meetingStatusesRequested());
    try {
      const { content } = await meetingStatusesService.get();
      dispatch(meetingStatusesReceived(content));
    } catch (error) {
      meetingStatusesFailed(error.message);
    }
  }
};

export const getMeetingStatusesList = () => (state) =>
  state.meetingStatuses.entities;

export const getMeetingStatusesLoadingStatus = () => (state) =>
  state.meetingStatuses.isLoading;

export const getMeetingStatusNameById = (id) => (state) => {
  if (state.meetingStatuses.entities) {
    return state.meetingStatuses.entities.find((meet) => meet._id === id).name;
  }
};

export default meetingStatusesReducer;
