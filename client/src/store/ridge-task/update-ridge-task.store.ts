import { createSlice } from "@reduxjs/toolkit";

const updateRidgeTaskSlice = createSlice({
  name: "updateRidgeTask",
  initialState: {
    entities: false,
    taskId: "",
  },
  reducers: {
    updateRidgeTaskOpenSetted: (state, action) => {
      state.entities = action.payload;
    },
    updateRidgeTaskId: (state, action) => {
      state.taskId = action.payload;
    },
  },
});

const { reducer: updateRidgeTaskReducer, actions } = updateRidgeTaskSlice;

const { updateRidgeTaskOpenSetted, updateRidgeTaskId } = actions;

export const setUpdateRidgeTaskOpenState = (payload) => (dispatch) => {
  dispatch(updateRidgeTaskOpenSetted(payload));
};

export const setUpdateRidgeTaskId = (payload) => (dispatch) => {
  dispatch(updateRidgeTaskId(payload));
};

export const loadUpdateRidgeTaskOpenState = () => (state) => {
  return state?.updateRidgeTask?.entities;
};

export const getUpdateRidgeTaskId = () => (state) => {
  return state.updateRidgeTask.taskId;
};

export default updateRidgeTaskReducer;
