import { createSlice } from "@reduxjs/toolkit";
import { objectEstateTypesArray } from "@data/object/object-estate-types";

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

export const loadEstateTypesList = () => (dispatch) => {
  dispatch(estateTypesLoaded(objectEstateTypesArray));
};

export const getEstateTypesList = () => (state) => state.estateTypes.entities;

export const getEstateTypeNameById = (id) => (state) => {
  const estateType = state?.estateTypes?.entities?.find(
    (type) => type?._id === id
  );
  const result = estateType?.name;

  return result;
};

export default estateTypesReducer;
