import { createSlice } from "@reduxjs/toolkit";
import { meetingStatusesArray } from "@data/meetings/meeting-statuses";

const meetingStatusesSlice = createSlice({
  name: "meetingStatuses",
  initialState: {
    entities: null
  },
  reducers: {
    meetingStatusesLoaded: (state, action) => {
      state.entities = action.payload;
    }
  }
});

const { reducer: meetingStatusesReducer, actions } = meetingStatusesSlice;
const { meetingStatusesLoaded } = actions;

export const loadMeetingStatusesList = () => async (dispatch) => {
  dispatch(meetingStatusesLoaded(meetingStatusesArray));
};

export const getMeetingStatusesList = () => (state) =>
  state.meetingStatuses.entities;

export const getMeetingStatusNameById = (id) => (state) => {
  if (state?.meetingStatuses?.entities) {
    return state?.meetingStatuses?.entities.find((meet) => meet?._id === id)
      ?.name;
  }
};

export default meetingStatusesReducer;
