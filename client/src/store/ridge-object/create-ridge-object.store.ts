import { createSlice } from "@reduxjs/toolkit";

const createRidgeObjectSlice = createSlice({
  name: "createRidgeObject",
  initialState: {
    entities: false,
  },
  reducers: {
    createRidgeObjectOpenSetted: (state, action) => {
      state.entities = action.payload;
    },
  },
});

const { reducer: createRidgeObjectReducer, actions } = createRidgeObjectSlice;

const { createRidgeObjectOpenSetted } = actions;

export const setCreateRidgeObjectOpenState = (payload) => (dispatch) => {
  dispatch(createRidgeObjectOpenSetted(payload));
};

export const loadCreateRidgeObjectOpenState = () => (state) => {
  return state?.createRidgeObject?.entities;
};

export const getCreateRidgeObjectOpenState = () => (state) => {
  return state?.createRidgeObject?.entities;
};

export default createRidgeObjectReducer;
