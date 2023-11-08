import { createSlice } from "@reduxjs/toolkit";

const createMeetingSlice = createSlice({
  name: "createMeeting",
  initialState: {
    entities: false,
  },
  reducers: {
    createMeetingOpenSetted: (state, action) => {
      state.entities = action.payload;
    },
  },
});

const { reducer: createMeetingReducer, actions } = createMeetingSlice;

const { createMeetingOpenSetted } = actions;

export const setCreateMeetingOpenState = (payload) => (dispatch) => {
  dispatch(createMeetingOpenSetted(payload));
};

export const getCreateMeetingOpenState = () => (state) => {
  return state?.createMeeting?.entities;
};


export default createMeetingReducer;
