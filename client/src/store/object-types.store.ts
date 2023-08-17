import { createSlice } from "@reduxjs/toolkit";
import objectTypesService from "../services/object-type.service";

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
const { objectTypesRequested, objectTypesReceived, objectTypesFailed } = actions;

export const loadObjectTypesList = () => async (dispatch) => {
  dispatch(objectTypesRequested());
  try {
    const { content } = await objectTypesService.get();
    dispatch(objectTypesReceived(content));
  } catch (error) {
    objectTypesFailed(error.message);
  }
};

export const getObjectTypesList = () => (state) => state.objectTypes.entities;

export const getObjectTypesStatus = () => (state) => state.objectTypes.isLoading;

export const getObjectTypeNameById = (id) => (state) => {
  const objectType = state?.objectTypes?.entities?.find((type) => type?._id === id);
  const result = objectType?.name;

  return result;
};


export default objectTypesReducer;
