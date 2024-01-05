import { createSlice } from "@reduxjs/toolkit";
import { objectTypesArray } from "../../data/object/object-types";

const objectTypesSlice = createSlice({
  name: "objectTypes",
  initialState: {
    entities: null,
  },
  reducers: {
    objectTypesLoaded: (state, action) => {
      state.entities = action.payload;
    },
  },
});

const { reducer: objectTypesReducer, actions } = objectTypesSlice;
const { objectTypesLoaded } = actions;

export const loadObjectTypesList = () => async (dispatch) => {
  dispatch(objectTypesLoaded(objectTypesArray));
};

export const getObjectTypesList = () => (state) => state.objectTypes.entities;

export const getObjectTypeNameById = (id) => (state) => {
  const objectType = state?.objectTypes?.entities?.find(
    (type) => type?._id === id
  );
  const result = objectType?.name;

  return result;
};

export default objectTypesReducer;
