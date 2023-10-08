import { createSlice } from "@reduxjs/toolkit";
import { currentRentersArray } from "../../mock/object/current-renters";

const currentRentersSlice = createSlice({
  name: "currentRenters",
  initialState: {
    entities: [],
    isLoading: true,
    error: null,
  },
  reducers: {
    currentRentersRequested: (state) => {
      state.isLoading = true;
    },
    currentRentersReceived: (state, action) => {
      state.entities = action.payload;
      state.isLoading = false;
    },
    currentRentersFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

const { reducer: currentRentersReducer, actions } = currentRentersSlice;
const { currentRentersReceived } = actions;

export const loadCurrentRentersList = () => async (dispatch) => {
  dispatch(currentRentersReceived(currentRentersArray));
};

export const getCurrentRentersList = () => (state) =>
  state.currentRenters.entities;

export const getCurrentRentersStatus = () => (state) =>
  state.currentRenters.isLoading;

export const getCurrentRenterNameById = (id) => (state) => {
  const currentRenters = state?.currentRenters?.entities?.find(
    (renter) => renter?._id === id
  );
  const result = currentRenters?.name;

  return result;
};

export default currentRentersReducer;
