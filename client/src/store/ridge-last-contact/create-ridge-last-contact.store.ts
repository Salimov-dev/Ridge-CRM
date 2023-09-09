import { createSlice } from "@reduxjs/toolkit";

const createRidgeLastContactSlice = createSlice({
  name: "createRidgeLastContact",
  initialState: {
    entities: false,
  },
  reducers: {
    createRidgeLastContactOpenSetted: (state, action) => {
      state.entities = action.payload;
    },
  },
});

const { reducer: createRidgeLastContactReducer, actions } = createRidgeLastContactSlice;

const { createRidgeLastContactOpenSetted } = actions;

export const setCreateRidgeLastContactOpenState = (payload) => (dispatch) => {
  dispatch(createRidgeLastContactOpenSetted(payload));
};

export const loadCreateRidgeLastContactOpenState = () => (state) => {
  return state?.createRidgeLastContact?.entities;
};

export const getCreateRidgeLastContactOpenState = () => (state) => {
  return state?.createRidgeLastContact?.entities;
};

export default createRidgeLastContactReducer;
