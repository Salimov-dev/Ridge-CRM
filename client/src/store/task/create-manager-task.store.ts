import { createSlice } from "@reduxjs/toolkit";

const createManagerTaskSlice = createSlice({
  name: "createManagerTask",
  initialState: {
    entities: false,
  },
  reducers: {
    createManagerTaskOpenSetted: (state, action) => {
      state.entities = action.payload;
    },
  },
});

const { reducer: createManagerTaskReducer, actions } = createManagerTaskSlice;

const { createManagerTaskOpenSetted } = actions;

export const setCreateManagerTaskOpenState = (payload) => (dispatch) => {
  dispatch(createManagerTaskOpenSetted(payload));
};

export const getCreateManagerTaskOpenState = () => (state) => {
  return state?.createManagerTask?.entities;
};

export default createManagerTaskReducer;
