import { createSlice } from "@reduxjs/toolkit";

const updatePresentationSlice = createSlice({
  name: "updatePresentation",
  initialState: {
    entities: false,
    presentationId: "",
  },
  reducers: {
    updatePresentationOpenSetted: (state, action) => {
      state.entities = action.payload;
    },
    updatePresentationId: (state, action) => {
      state.presentationId = action.payload;
    },
  },
});

const { reducer: updatePresentationReducer, actions } = updatePresentationSlice;

const { updatePresentationOpenSetted, updatePresentationId } = actions;

export const setUpdatePresentationOpenState = (payload) => (dispatch) => {
  dispatch(updatePresentationOpenSetted(payload));
};

export const setUpdatePresentationId = (payload) => (dispatch) => {
  dispatch(updatePresentationId(payload));
};

export const getUpdatePresentationOpenState = () => (state) => {
  return state?.updatePresentation?.entities;
};

export const getUpdatePresentationId = () => (state) => {
  return state.updatePresentation.presentationId;
};

export default updatePresentationReducer;
