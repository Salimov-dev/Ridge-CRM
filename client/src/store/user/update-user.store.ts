import { createSlice } from "@reduxjs/toolkit";

const updateManagerSlice = createSlice({
  name: "updateManager",
  initialState: {
    entities: false,
    ManagerId: "",
  },
  reducers: {
    updateManagerOpenSetted: (state, action) => {
      state.entities = action.payload;
    },
    updateManagerId: (state, action) => {
      state.ManagerId = action.payload;
    },
  },
});

const { reducer: updateManagerReducer, actions } = updateManagerSlice;

const { updateManagerOpenSetted, updateManagerId } = actions;

export const loadUpdateManagerOpenState = () => (state) => {
  return state?.updateManager?.entities;
};

export const setUpdateManagerOpenState = (payload) => (dispatch) => {
  dispatch(updateManagerOpenSetted(payload));
};

export const getUpdateManagerOpenState = () => (state) => {
  return state?.updateManager?.entities;
};

export const setUpdateManagerId = (payload) => (dispatch) => {
  dispatch(updateManagerId(payload));
};

export const getUpdateManagerId = () => (state) => {
  return state.updateManager.ManagerId;
};

export default updateManagerReducer;
