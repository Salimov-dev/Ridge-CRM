import { createSlice } from "@reduxjs/toolkit";
import dayjs from "dayjs";

const monthIndexSlice = createSlice({
  name: "monthIndex",
  initialState: {
    entities: dayjs().month(),
  },
  reducers: {
    monthIndexSetted: (state, action) => {
      state.entities = action.payload;
    },
  },
});

const { reducer: monthIndexReducer, actions } = monthIndexSlice;

const { monthIndexSetted } = actions;

export const setMonthIndex = (payload) => (dispatch) => {
  dispatch(monthIndexSetted(payload));
};

export const getMonthIndexState = () => (state) => {
  return state.monthIndex.entities;
};

export default monthIndexReducer;
