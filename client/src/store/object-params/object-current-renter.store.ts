import { createSlice } from "@reduxjs/toolkit";
import { objectCurrentRentersArray } from "@data/object/object-current-renters";

const currentRentersSlice = createSlice({
  name: "currentRenters",
  initialState: {
    entities: []
  },
  reducers: {
    currentRentersLoaded: (state, action) => {
      state.entities = action.payload;
    }
  }
});

const { reducer: currentRentersReducer, actions } = currentRentersSlice;
const { currentRentersLoaded } = actions;

export const loadCurrentRentersList = () => async (dispatch) => {
  dispatch(currentRentersLoaded(objectCurrentRentersArray));
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
