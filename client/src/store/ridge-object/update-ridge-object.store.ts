import { createSlice } from "@reduxjs/toolkit";

const updateRidgeObjectSlice = createSlice({
  name: "updateRidgeObject",
  initialState: {
    entities: false,
    objectId: "",
  },
  reducers: {
    updateRidgeObjectOpenSetted: (state, action) => {
      state.entities = action.payload;
    },
    updateRidgeObjectId: (state, action) => {
      state.objectId = action.payload;
    },
  },
});

const { reducer: updateRidgeObjectReducer, actions } = updateRidgeObjectSlice;

const { updateRidgeObjectOpenSetted, updateRidgeObjectId } = actions;

export const setUpdateRidgeObjectOpenState = (payload) => (dispatch) => {
  dispatch(updateRidgeObjectOpenSetted(payload));
};

export const loadUpdateRidgeObjectOpenState = () => (state) => {
  return state?.updateRidgeObject?.entities;
};

export const setUpdateRidgeObjectId = (payload) => (dispatch) => {
  dispatch(updateRidgeObjectId(payload));
};

export const getUpdateRidgeObjectId = () => (state) => {
  return state.updateRidgeObject.objectId;
};

export default updateRidgeObjectReducer;
