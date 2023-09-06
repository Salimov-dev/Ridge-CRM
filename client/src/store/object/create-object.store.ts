import { createSlice } from "@reduxjs/toolkit";

const createObjectSlice = createSlice({
  name: "createObject",
  initialState: {
    entities: false,
  },
  reducers: {
    createObjectOpenSetted: (state, action) => {
      state.entities = action.payload;
    },
  },
});

const { reducer: createObjectReducer, actions } = createObjectSlice;

const { createObjectOpenSetted } = actions;

export const setCreateObjectOpenState = (payload) => (dispatch) => {
  dispatch(createObjectOpenSetted(payload));
};

export const loadCreateObjectOpenState = () => (state) => {
  return state?.createObject?.entities;
};

export const getCreateObjectOpenState = () => (state) => {
  return state?.createObject?.entities;
};

export default createObjectReducer;
