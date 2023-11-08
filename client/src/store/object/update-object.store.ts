import { createSlice } from "@reduxjs/toolkit";

const updateObjectSlice = createSlice({
  name: "updateObject",
  initialState: {
    entities: false,
    objectId: "",
  },
  reducers: {
    updateObjectOpenSetted: (state, action) => {
      state.entities = action.payload;
    },
    updateObjectId: (state, action) => {
      state.objectId = action.payload;
    },
  },
});

const { reducer: updateObjectReducer, actions } = updateObjectSlice;

const { updateObjectOpenSetted, updateObjectId } = actions;

export const setUpdateObjectOpenState = (payload) => (dispatch) => {
  dispatch(updateObjectOpenSetted(payload));
};

export const getUpdateObjectOpenState = () => (state) => {
  return state?.updateObject?.entities;
};

export const setUpdateObjectId = (payload) => (dispatch) => {
  dispatch(updateObjectId(payload));
};

export const getUpdateObjectId = () => (state) => {
  return state.updateObject.objectId;
};

export default updateObjectReducer;
