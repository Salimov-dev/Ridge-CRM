import { createSlice } from "@reduxjs/toolkit";

const openObjectPageSlice = createSlice({
  name: "openObjectPage",
  initialState: {
    entities: false,
    taskId: "",
  },
  reducers: {
    openObjectPageOpenSetted: (state, action) => {
      state.entities = action.payload;
    },
    openObjectPageId: (state, action) => {
      state.taskId = action.payload;
    },
  },
});

const { reducer: openObjectPageReducer, actions } = openObjectPageSlice;

const { openObjectPageOpenSetted, openObjectPageId } = actions;

export const setOpenObjectPageOpenState = (payload) => (dispatch) => {
  dispatch(openObjectPageOpenSetted(payload));
};

export const setOpenObjectPageId = (payload) => (dispatch) => {
  dispatch(openObjectPageId(payload));
};

export const loadOpenObjectPageOpenState = () => (state) => {
  return state?.openObjectPage?.entities;
};

export const getOpenObjectPageId = () => (state) => {
  return state.openObjectPage.taskId;
};

export default openObjectPageReducer;
