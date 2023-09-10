import { createSlice } from "@reduxjs/toolkit";

const updateLastContactSlice = createSlice({
  name: "updateLastContact",
  initialState: {
    entities: false,
    contactId: "",
  },
  reducers: {
    updateLastContactOpenSetted: (state, action) => {
      state.entities = action.payload;
    },
    updateLastContactId: (state, action) => {
      state.contactId = action.payload;
    },
  },
});

const { reducer: updateLastContactReducer, actions } = updateLastContactSlice;

const { updateLastContactOpenSetted, updateLastContactId } = actions;

export const setUpdateLastContactOpenState = (payload) => (dispatch) => {
  dispatch(updateLastContactOpenSetted(payload));
};

export const setUpdateLastContactId = (payload) => (dispatch) => {
  dispatch(updateLastContactId(payload));
};

export const loadUpdateLastContactOpenState = () => (state) => {
  return state?.updateLastContact?.entities;
};

export const getUpdateLastContactId = () => (state) => {
  return state.updateLastContact.contactId;
};

export default updateLastContactReducer;
