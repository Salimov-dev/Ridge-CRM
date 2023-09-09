import { createSlice } from "@reduxjs/toolkit";

const createLastContactSlice = createSlice({
  name: "createLastContact",
  initialState: {
    entities: false,
  },
  reducers: {
    createLastContactOpenSetted: (state, action) => {
      state.entities = action.payload;
    },
  },
});

const { reducer: createLastContactReducer, actions } = createLastContactSlice;

const { createLastContactOpenSetted } = actions;

export const setCreateLastContactOpenState = (payload) => (dispatch) => {
  dispatch(createLastContactOpenSetted(payload));
};

export const loadCreateLastContactOpenState = () => (state) => {
  return state?.createLastContact?.entities;
};

export const getCreateLastContactOpenState = () => (state) => {
  return state?.createLastContact?.entities;
};

export default createLastContactReducer;
