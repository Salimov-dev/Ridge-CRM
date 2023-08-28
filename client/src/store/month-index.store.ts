import { createSlice } from "@reduxjs/toolkit";

const monthIndexSlice = createSlice({
  name: "monthIndex",
  initialState: {
    entities: 0,
  },
  reducers: {
    monthIndexSetted: (state, action) => {
      state.entities = action.payload;
    },
  },
});

const { reducer: monthIndexReducer, actions } = monthIndexSlice;

const { monthIndexSetted } = actions;

export const setMonthIndex = (query) => (dispatch) => {
  dispatch(monthIndexSetted(query));
};

export const getMonthIndexState = () => (state) => {
  return state.monthIndex.entities;
};

export default monthIndexReducer;
