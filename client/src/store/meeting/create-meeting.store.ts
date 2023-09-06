import { createSlice } from "@reduxjs/toolkit";

const createMeetingSlice = createSlice({
  name: "createMeeting",
  initialState: {
    entities: false,
    date: null,
  },
  reducers: {
    createMeetingOpenSetted: (state, action) => {
      state.entities = action.payload;
    },
    createMeetingDate: (state, action) => {
      state.date = action.payload;
    },
  },
});

const { reducer: createMeetingReducer, actions } = createMeetingSlice;

const { createMeetingOpenSetted, createMeetingDate } = actions;

export const setCreateMeetingOpenState = (payload) => (dispatch) => {
  dispatch(createMeetingOpenSetted(payload));
};

export const loadCreateMeetingOpenState = () => (state) => {
  return state?.createMeeting?.entities;
};

export const getCreateMeetingOpenState = () => (state) => {
  return state?.createMeeting?.entities;
};

// export const setCreateMeetingDate = (payload) => (dispatch) => {
//   dispatch(createMeetingDate(payload));
// };
export const setCreateMeetingDate = (payload) => (dispatch) => {
  const serializedDate = payload.toISOString();
  dispatch(createMeetingDate(serializedDate));
};

export const getCreateMeetingDate = () => (state) => {
  return state?.createMeeting?.date;
};

export default createMeetingReducer;
