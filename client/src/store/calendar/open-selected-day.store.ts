import { createSlice } from "@reduxjs/toolkit";

const openSelectedDaySlice = createSlice({
  name: "openSelectedDay",
  initialState: {
    entities: false,
  },
  reducers: {
    openSelectedDayOpenSetted: (state, action) => {
      state.entities = action.payload;
    },
  },
});

const { reducer: openSelectedDayReducer, actions } = openSelectedDaySlice;

const { openSelectedDayOpenSetted } = actions;

export const setOpenSelectedDayOpenState = (payload) => (dispatch) => {
  dispatch(openSelectedDayOpenSetted(payload));
};

export const getOpenSelectedDayOpenState = () => (state) => {
  return state?.openSelectedDay?.entities;
};


export default openSelectedDayReducer;
