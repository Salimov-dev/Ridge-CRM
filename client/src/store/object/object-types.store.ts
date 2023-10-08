import { createSlice } from "@reduxjs/toolkit";
import { objectTypesArray } from "../../mock/object/object-types";

const objectTypesSlice = createSlice({
  name: "objectTypes",
  initialState: {
    entities: null,
    isLoading: true,
    error: null,
  },
  reducers: {
    objectTypesRequested: (state) => {
      state.isLoading = true;
    },
    objectTypesReceived: (state, action) => {
      state.entities = action.payload;
      state.isLoading = false;
    },
    objectTypesFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

const { reducer: objectTypesReducer, actions } = objectTypesSlice;
const { objectTypesReceived } =
  actions;

export const loadObjectTypesList = () => async (dispatch) => {
    dispatch(objectTypesReceived(objectTypesArray));
};

export const getObjectTypesList = () => (state) => state.objectTypes.entities;

export const getObjectTypesStatus = () => (state) =>
  state.objectTypes.isLoading;

export const getObjectTypeNameById = (id) => (state) => {
  const objectType = state?.objectTypes?.entities?.find(
    (type) => type?._id === id
  );
  const result = objectType?.name;

  return result;
};

export default objectTypesReducer;
