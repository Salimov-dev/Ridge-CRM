import { createSlice } from "@reduxjs/toolkit";

const updateObjectSlice = createSlice({
  name: "updateObject",
  initialState: {
    entities: false,
    ObjectId: "",
  },
  reducers: {
    updateObjectOpenSetted: (state, action) => {
      state.entities = action.payload;
    },
    updateObjectId: (state, action) => {
      state.ObjectId = action.payload;
    },
  },
});

const { reducer: updateObjectReducer, actions } = updateObjectSlice;

const { updateObjectOpenSetted, updateObjectId } = actions;

export const setUpdateObjectOpenState = (payload) => (dispatch) => {
  dispatch(updateObjectOpenSetted(payload));
};

export const setUpdateObjectId = (payload) => (dispatch) => {
  dispatch(updateObjectId(payload));
};

export const loadUpdateObjectOpenState = () => (state) => {
  return state?.updateObject?.entities;
};

export const getUpdateObjectId = () => (state) => {
  return state.updateObject.ObjectId;
};

export default updateObjectReducer;
