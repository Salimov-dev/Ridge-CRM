import { createSlice } from "@reduxjs/toolkit";
import { objectPropertiesArray } from "../../mock/object/object-properties";

const objectPropertiesSlice = createSlice({
  name: "objectProperties",
  initialState: {
    entities: null,
    isLoading: true,
    error: null,
  },
  reducers: {
    objectPropertiesRequested: (state) => {
      state.isLoading = true;
    },
    objectPropertiesReceived: (state, action) => {
      state.entities = action.payload;
      state.isLoading = false;
    },
    objectPropertiesFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

const { reducer: objectPropertiesReducer, actions } = objectPropertiesSlice;
const { objectPropertiesReceived } = actions;

export const loadObjectPropertiesList = () => async (dispatch) => {
  dispatch(objectPropertiesReceived(objectPropertiesArray));
};

export const getObjectPropertiesList = () => (state) => state.objectProperties.entities;

export const getObjectPropertiesStatus = () => (state) => state.objectProperties.isLoading;

export const getRentTypeNameById = (id) => (state) => {
  const rentType = state?.objectProperties?.entities?.find((type) => type?._id === id);
  const result = rentType?.name;

  return result;
};

export default objectPropertiesReducer;
