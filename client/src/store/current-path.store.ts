import { createSlice } from "@reduxjs/toolkit";

const currrentPathSlice = createSlice({
  name: "currrentPath",
  initialState: {
    entities: "",
  },
  reducers: {
    currrentPathSetted: (state, action) => {
      state.entities = action.payload;
    },
  },
});

const { reducer: currrentPathReducer, actions } = currrentPathSlice;

const { currrentPathSetted } = actions;

export const setCurrrentPathState = (payload) => (dispatch) => {
  dispatch(currrentPathSetted(payload));
};

export const getCurrrentPathState = () => (state) => {
  return state.currrentPath.entities;
};

export default currrentPathReducer;
