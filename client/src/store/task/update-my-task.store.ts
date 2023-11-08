import { createSlice } from "@reduxjs/toolkit";

const updateMyTaskSlice = createSlice({
  name: "updateMyTask",
  initialState: {
    entities: false,
    taskId: "",
  },
  reducers: {
    updateMyTaskOpenSetted: (state, action) => {
      state.entities = action.payload;
    },
    updateMyTaskId: (state, action) => {
      state.taskId = action.payload;
    },
  },
});

const { reducer: updateMyTaskReducer, actions } = updateMyTaskSlice;

const { updateMyTaskOpenSetted, updateMyTaskId } = actions;

export const setUpdateMyTaskOpenState = (payload) => (dispatch) => {
  dispatch(updateMyTaskOpenSetted(payload));
};

export const setUpdateMyTaskId = (payload) => (dispatch) => {
  dispatch(updateMyTaskId(payload));
};

export const getUpdateMyTaskOpenState = () => (state) => {
  return state?.updateMyTask?.entities;
};

export const getUpdateMyTaskId = () => (state) => {
  return state.updateMyTask.taskId;
};

export default updateMyTaskReducer;
