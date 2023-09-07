import { createSlice } from "@reduxjs/toolkit";

const createObjectFromRidgeSlice = createSlice({
  name: "createObjectFromRidge",
  initialState: {
    entities: false,
    objectId: "",
  },
  reducers: {
    createObjectFromRidgeOpenSetted: (state, action) => {
      state.entities = action.payload;
    },
    updateObjectFromRidgeObjectId: (state, action) => {
      state.objectId = action.payload;
    },
  },
});

const { reducer: createObjectFromRidgeReducer, actions } = createObjectFromRidgeSlice;

const { createObjectFromRidgeOpenSetted, updateObjectFromRidgeObjectId } = actions;

export const loadCreateObjectFromRidgeOpenState = () => (state) => {
  return state?.createObjectFromRidge?.entities;
};

export const setCreateObjectFromRidgeOpenState = (payload) => (dispatch) => {
  dispatch(createObjectFromRidgeOpenSetted(payload));
};

export const getCreateObjectFromRidgeOpenState = () => (state) => {
  return state?.createObjectFromRidge?.entities;
};

export const setUpdateObjectFromRidgeObjectId = (payload) => (dispatch) => {
  dispatch(updateObjectFromRidgeObjectId(payload));
};

export const getUpdateObjectFromRidgeObjectId = () => (state) => {
  return state.createObjectFromRidge.objectId;
};

export default createObjectFromRidgeReducer;
