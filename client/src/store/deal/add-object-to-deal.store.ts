import { createSlice } from "@reduxjs/toolkit";

const addObjectToDealSlice = createSlice({
  name: "addObjectToDeal",
  initialState: {
    entities: false,
    stageId: "",
  },
  reducers: {
    addObjectToDealOpenSetted: (state, action) => {
      state.entities = action.payload;
    },
    updateStageId: (state, action) => {
      state.stageId = action.payload;
    },
  },
});

const { reducer: addObjectToDealReducer, actions } = addObjectToDealSlice;

const { addObjectToDealOpenSetted, updateStageId } = actions;

export const setAddObjectToDealOpenState = (payload) => (dispatch) => {
  dispatch(addObjectToDealOpenSetted(payload));
};

export const loadAddObjectToDealOpenState = () => (state) => {
  return state?.addObjectToDeal?.entities;
};

export const getAddObjectToDealOpenState = () => (state) => {
  return state?.addObjectToDeal.entities;
};

export const setAddObjectToDealStageId = (payload) => (dispatch) => {
  dispatch(updateStageId(payload));
};

export const getAddObjectToDealStageId = () => (state) => {
  return state.addObjectToDeal.stageId;
};

export default addObjectToDealReducer;
