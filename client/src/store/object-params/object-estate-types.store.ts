import { Dispatch, createSlice } from "@reduxjs/toolkit";
import { objectEstateTypesArray } from "@data/object/object-estate-types";

interface IEstateTypesStoreInitialState {
  entities: { _id: string; name: string }[];
}

interface IStoreState {
  estateTypes: IEstateTypesStoreInitialState;
}

const estateTypesSlice = createSlice({
  name: "estateTypes",
  initialState: {
    entities: null
  },
  reducers: {
    estateTypesLoaded: (state, action) => {
      state.entities = action.payload;
    }
  }
});

const { reducer: estateTypesReducer, actions } = estateTypesSlice;
const { estateTypesLoaded } = actions;

export const loadEstateTypesList = () => (dispatch: Dispatch) => {
  dispatch(estateTypesLoaded(objectEstateTypesArray));
};

export const getEstateTypesList = () => (state: IStoreState) =>
  state.estateTypes.entities;

export const getEstateTypeNameById = (id: string) => (state: IStoreState) => {
  const estateType = state?.estateTypes?.entities?.find(
    (type) => type?._id === id
  );
  const result = estateType?.name;

  return result;
};

export default estateTypesReducer;
