import { createSlice } from "@reduxjs/toolkit";

const addObjectToDealSlice = createSlice({
  name: "addObjectToDeal",
  initialState: {
    entities: false,
  },
  reducers: {
    addObjectToDealOpenSetted: (state, action) => {
      state.entities = action.payload;
    },
  },
});

const { reducer: addObjectToDealReducer, actions } = addObjectToDealSlice;

const { addObjectToDealOpenSetted } = actions;

export const setAddObjectToDealOpenState = (payload) => (dispatch) => {
  dispatch(addObjectToDealOpenSetted(payload));
};

export const loadAddObjectToDealOpenState = () => (state) => {
  return state?.addObjectToDeal?.entities;
};

export const getAddObjectToDealOpenState = () => (state) => {
  return state?.addObjectToDeal.entities;
};

export default addObjectToDealReducer;
