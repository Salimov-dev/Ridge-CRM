import { createSlice } from "@reduxjs/toolkit";

const createMyTaskSlice = createSlice({
  name: "createMyTask",
  initialState: {
    entities: false,
  },
  reducers: {
    createMyTaskOpenSetted: (state, action) => {
      state.entities = action.payload;
    },
  },
});

const { reducer: createMyTaskReducer, actions } = createMyTaskSlice;

const { createMyTaskOpenSetted } = actions;

export const setCreateMyTaskOpenState = (payload) => (dispatch) => {
  dispatch(createMyTaskOpenSetted(payload));
};

export const getCreateMyTaskOpenState = () => (state) => {
  return state?.createMyTask.entities;
};

export default createMyTaskReducer;
