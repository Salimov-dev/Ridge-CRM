import { Dispatch, createSlice } from "@reduxjs/toolkit";
import { objectRentTypesArray } from "@data/object/object-rent-types";

interface IRentTypesStoreInitialState {
  entities: { _id: string; name: string }[];
}

interface IStoreState {
  rentTypes: IRentTypesStoreInitialState;
}

const rentTypesSlice = createSlice({
  name: "rentTypes",
  initialState: {
    entities: null
  },
  reducers: {
    rentTypesLoaded: (state, action) => {
      state.entities = action.payload;
    }
  }
});

const { reducer: rentTypesReducer, actions } = rentTypesSlice;
const { rentTypesLoaded } = actions;

export const loadRentTypesList = () => async (dispatch: Dispatch) => {
  dispatch(rentTypesLoaded(objectRentTypesArray));
};

export const getRentTypesList = () => (state: IStoreState) =>
  state.rentTypes.entities;

export const getRentTypeNameById = (id: string) => (state: IStoreState) => {
  const rentType = state?.rentTypes?.entities?.find((type) => type?._id === id);
  const result = rentType?.name;

  return result;
};

export default rentTypesReducer;
