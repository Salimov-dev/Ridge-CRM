import { Dispatch, createSlice } from "@reduxjs/toolkit";
import { objectCurrentRentersArray } from "@data/object/object-current-renters";

interface ICurrentRentersStoreInitialState {
  entities: { _id: string; name: string }[];
}

interface IStoreState {
  currentRenters: ICurrentRentersStoreInitialState;
}

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

export const loadCurrentRentersList = () => async (dispatch: Dispatch) => {
  dispatch(currentRentersLoaded(objectCurrentRentersArray));
};

export const getCurrentRentersList = () => (state: IStoreState) =>
  state.currentRenters.entities;

export const getCurrentRenterNameById =
  (id: string) => (state: IStoreState) => {
    const currentRenters = state?.currentRenters?.entities?.find(
      (renter) => renter?._id === id
    );
    const result = currentRenters?.name;

    return result;
  };

export default currentRentersReducer;
