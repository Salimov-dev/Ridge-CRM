import { createSlice } from "@reduxjs/toolkit";

const updateMeetingSlice = createSlice({
  name: "updateMeeting",
  initialState: {
    entities: false,
    meetingId: "",
  },
  reducers: {
    updateMeetingOpenSetted: (state, action) => {
      state.entities = action.payload;
    },
    updateMeetingId: (state, action) => {
      state.meetingId = action.payload;
    },
  },
});

const { reducer: updateMeetingReducer, actions } = updateMeetingSlice;

const { updateMeetingOpenSetted, updateMeetingId } = actions;

export const setUpdateMeetingOpenState = (payload) => (dispatch) => {
  dispatch(updateMeetingOpenSetted(payload));
};

export const setUpdateMeetingId = (payload) => (dispatch) => {
  dispatch(updateMeetingId(payload));
};

export const loadUpdateMeetingOpenState = () => (state) => {
  return state?.updateMeeting?.entities;
};

export const getUpdateMeetingId = () => (state) => {
  return state.updateMeeting.meetingId;
};

export default updateMeetingReducer;
