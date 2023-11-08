import { createSlice } from "@reduxjs/toolkit";

const updateManagerTaskSlice = createSlice({
  name: "updateManagerTask",
  initialState: {
    entities: false,
    taskId: "",
  },
  reducers: {
    updateManagerTaskOpenSetted: (state, action) => {
      state.entities = action.payload;
    },
    updateManagerTaskId: (state, action) => {
      state.taskId = action.payload;
    },
  },
});

const { reducer: updateManagerTaskReducer, actions } = updateManagerTaskSlice;

const { updateManagerTaskOpenSetted, updateManagerTaskId } = actions;

export const setUpdateManagerTaskOpenState = (payload) => (dispatch) => {
  dispatch(updateManagerTaskOpenSetted(payload));
};

export const setUpdateManagerTaskId = (payload) => (dispatch) => {
  dispatch(updateManagerTaskId(payload));
};

export const getUpdateManagerTaskOpenState = () => (state) => {
  return state?.updateManagerTask?.entities;
};

export const getUpdateManagerTaskId = () => (state) => {
  return state.updateManagerTask.taskId;
};

export default updateManagerTaskReducer;
