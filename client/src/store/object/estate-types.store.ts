import { createSlice } from "@reduxjs/toolkit";
import { estateTypesArray } from "../../mock/object/estate-types";

const estateTypesSlice = createSlice({
  name: "estateTypes",
  initialState: {
    entities: null,
    isLoading: true,
    error: null,
  },
  reducers: {
    estateTypesRequested: (state) => {
      state.isLoading = true;
    },
    estateTypesReceived: (state, action) => {
      state.entities = action.payload;
      state.isLoading = false;
    },
    estateTypesFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

const { reducer: estateTypesReducer, actions } = estateTypesSlice;
const { estateTypesReceived } =
  actions;

export const loadEstateTypesList = () => async (dispatch) => {
    dispatch(estateTypesReceived(estateTypesArray));
};

export const getEstateTypesList = () => (state) => state.estateTypes.entities;

export const getEstateTypesStatus = () => (state) =>
  state.estateTypes.isLoading;

export const getEstateTypeNameById = (id) => (state) => {
  const estateType = state?.estateTypes?.entities?.find(
    (type) => type?._id === id
  );
  const result = estateType?.name;

  return result;
};

export default estateTypesReducer;
