import { createSlice } from "@reduxjs/toolkit";

const openRidgeObjectPageSlice = createSlice({
  name: "openRidgeObjectPage",
  initialState: {
    entities: false,
    taskId: "",
  },
  reducers: {
    openRidgeObjectPageOpenSetted: (state, action) => {
      state.entities = action.payload;
    },
    openRidgeObjectPageId: (state, action) => {
      state.taskId = action.payload;
    },
  },
});

const { reducer: openRidgeObjectPageReducer, actions } = openRidgeObjectPageSlice;

const { openRidgeObjectPageOpenSetted, openRidgeObjectPageId } = actions;

export const setOpenRidgeObjectPageOpenState = (payload) => (dispatch) => {
  dispatch(openRidgeObjectPageOpenSetted(payload));
};

export const setOpenRidgeObjectPageId = (payload) => (dispatch) => {
  dispatch(openRidgeObjectPageId(payload));
};

export const loadOpenRidgeObjectPageOpenState = () => (state) => {
  return state?.openRidgeObjectPage?.entities;
};

export const getOpenRidgeObjectPageId = () => (state) => {
  return state.openRidgeObjectPage.taskId;
};

export default openRidgeObjectPageReducer;
