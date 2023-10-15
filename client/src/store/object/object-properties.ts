import { createSlice } from "@reduxjs/toolkit";
import { objectPropertiesArray } from "../../mock/object/object-properties";

const objectPropertiesSlice = createSlice({
  name: "objectProperties",
  initialState: {
    entities: null,
  },
  reducers: {
    objectPropertiesLoaded: (state, action) => {
      state.entities = action.payload;
    },
  },
});

const { reducer: objectPropertiesReducer, actions } = objectPropertiesSlice;
const { objectPropertiesLoaded } = actions;

export const loadObjectPropertiesList = () => async (dispatch) => {
  dispatch(objectPropertiesLoaded(objectPropertiesArray));
};

export const getObjectPropertiesList = () => (state) => state.objectProperties.entities;

export const getObjectPropertiesNameById = (id) => (state) => {
  const rentType = state?.objectProperties?.entities?.find((type) => type?._id === id);
  const result = rentType?.name;

  return result;
};

export default objectPropertiesReducer;
