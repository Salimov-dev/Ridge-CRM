import { createSlice } from "@reduxjs/toolkit";

const createPresentationSlice = createSlice({
  name: "createPresentation",
  initialState: {
    entities: false,
  },
  reducers: {
    createPresentationOpenSetted: (state, action) => {
      state.entities = action.payload;
    },
  },
});

const { reducer: createPresentationReducer, actions } = createPresentationSlice;

const { createPresentationOpenSetted } = actions;

export const setCreatePresentationOpenState = (payload) => (dispatch) => {
  dispatch(createPresentationOpenSetted(payload));
};

export const loadCreatePresentationOpenState = () => (state) => {
  return state?.createPresentation?.entities;
};

export const getCreatePresentationOpenState = () => (state) => {
  return state?.createPresentation?.entities;
};

export default createPresentationReducer;
