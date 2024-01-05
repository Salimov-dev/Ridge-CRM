import { createSlice } from "@reduxjs/toolkit";
import { currentRentersArray } from "../../data/object/current-renters";

const currentRentersSlice = createSlice({
  name: "currentRenters",
  initialState: {
    entities: [],
  },
  reducers: {
    currentRentersLoaded: (state, action) => {
      state.entities = action.payload;
    },
  },
});

const { reducer: currentRentersReducer, actions } = currentRentersSlice;
const { currentRentersLoaded } = actions;

export const loadCurrentRentersList = () => async (dispatch) => {
  dispatch(currentRentersLoaded(currentRentersArray));
};

export const getCurrentRentersList = () => (state) =>
  state.currentRenters.entities;

export const getCurrentRenterNameById = (id) => (state) => {
  const currentRenters = state?.currentRenters?.entities?.find(
    (renter) => renter?._id === id
  );
  const result = currentRenters?.name;

  return result;
};

export default currentRentersReducer;
