import { createSlice } from "@reduxjs/toolkit";
import rentTypesService from "../../services/object/rent-type.service";

const rentTypesSlice = createSlice({
  name: "rentTypes",
  initialState: {
    entities: null,
    isLoading: true,
    error: null,
  },
  reducers: {
    rentTypesRequested: (state) => {
      state.isLoading = true;
    },
    rentTypesReceived: (state, action) => {
      state.entities = action.payload;
      state.isLoading = false;
    },
    rentTypesFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

const { reducer: rentTypesReducer, actions } = rentTypesSlice;
const { rentTypesRequested, rentTypesReceived, rentTypesFailed } = actions;

export const loadRentTypesList = () => async (dispatch) => {
  dispatch(rentTypesRequested());
  try {
    const { content } = await rentTypesService.get();
    dispatch(rentTypesReceived(content));
  } catch (error) {
    rentTypesFailed(error.message);
  }
};

export const getRentTypesList = () => (state) => state.rentTypes.entities;

export const getRentTypesStatus = () => (state) => state.rentTypes.isLoading;

export const getRentTypeNameById = (id) => (state) => {
  const rentType = state?.rentTypes?.entities?.find((type) => type?._id === id);
  const result = rentType?.name;

  return result;
};

export default rentTypesReducer;
