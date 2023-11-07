import { createSlice } from "@reduxjs/toolkit";

const transferObjectToAnotherManagerSlice = createSlice({
  name: "transferObjectToAnotherManager",
  initialState: {
    entities: false,
  },
  reducers: {
    transferObjectToAnotherManagerOpenSetted: (state, action) => {
      state.entities = action.payload;
    },
  },
});

const { reducer: transferObjectToAnotherManagerReducer, actions } = transferObjectToAnotherManagerSlice;

const { transferObjectToAnotherManagerOpenSetted } = actions;

export const setTransferObjectToAnotherManagerOpenState = (payload) => (dispatch) => {
  dispatch(transferObjectToAnotherManagerOpenSetted(payload));
};

export const getTransferObjectToAnotherManagerOpenState = () => (state) => {
  return state?.transferObjectToAnotherManager?.entities;
};

export default transferObjectToAnotherManagerReducer;
