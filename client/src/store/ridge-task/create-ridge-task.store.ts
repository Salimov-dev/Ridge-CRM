import { createSlice } from "@reduxjs/toolkit";

const createRidgeTaskSlice = createSlice({
  name: "createRidgeTask",
  initialState: {
    entities: false,
  },
  reducers: {
    createRidgeTaskOpenSetted: (state, action) => {
      state.entities = action.payload;
    },
  },
});

const { reducer: createRidgeTaskReducer, actions } = createRidgeTaskSlice;

const { createRidgeTaskOpenSetted } = actions;

export const setCreateRidgeTaskOpenState = (payload) => (dispatch) => {
  dispatch(createRidgeTaskOpenSetted(payload));
};

export const loadCreateRidgeTaskOpenState = () => (state) => {
  return state?.createRidgeTask?.entities;
};

export const getCreateRidgeTaskOpenState = () => (state) => {
  return state?.createRidgeTask.entities;
};

export default createRidgeTaskReducer;
