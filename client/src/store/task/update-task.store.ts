import { createSlice } from "@reduxjs/toolkit";

const updateTaskSlice = createSlice({
  name: "updateTask",
  initialState: {
    entities: false,
    taskId: "",
  },
  reducers: {
    updateTaskOpenSetted: (state, action) => {
      state.entities = action.payload;
    },
    updateTaskId: (state, action) => {
      state.taskId = action.payload;
    },
  },
});

const { reducer: updateTaskReducer, actions } = updateTaskSlice;

const { updateTaskOpenSetted, updateTaskId } = actions;

export const setUpdateTaskOpenState = (payload) => (dispatch) => {
  dispatch(updateTaskOpenSetted(payload));
};

export const setUpdateTaskId = (payload) => (dispatch) => {
  dispatch(updateTaskId(payload));
};

export const loadUpdateTaskOpenState = () => (state) => {
  return state?.updateTask?.entities;
};

export const getUpdateTaskId = () => (state) => {
  return state.updateTask.taskId;
};

export default updateTaskReducer;
