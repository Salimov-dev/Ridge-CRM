import { createSlice } from "@reduxjs/toolkit";

const updateRidgeLastContactSlice = createSlice({
  name: "updateRidgeLastContact",
  initialState: {
    entities: false,
    contactId: "",
  },
  reducers: {
    updateRidgeLastContactOpenSetted: (state, action) => {
      state.entities = action.payload;
    },
    updateRidgeLastContactId: (state, action) => {
      state.contactId = action.payload;
    },
  },
});

const { reducer: updateRidgeLastContactReducer, actions } = updateRidgeLastContactSlice;

const { updateRidgeLastContactOpenSetted, updateRidgeLastContactId } = actions;

export const setUpdateRidgeLastContactOpenState = (payload) => (dispatch) => {
  dispatch(updateRidgeLastContactOpenSetted(payload));
};

export const setUpdateRidgeLastContactId = (payload) => (dispatch) => {
  dispatch(updateRidgeLastContactId(payload));
};

export const getUpdateRidgeLastContactOpenState = () => (state) => {
  return state?.updateRidgeLastContact?.entities;
};

export const getUpdateRidgeLastContactId = () => (state) => {
  return state.updateRidgeLastContact.contactId;
};

export default updateRidgeLastContactReducer;
