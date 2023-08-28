import { createSlice } from "@reduxjs/toolkit";
import estateTypesService from "../../services/object/estate-type.service";

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
const { estateTypesRequested, estateTypesReceived, estateTypesFailed } =
  actions;

export const loadEstateTypesList = () => async (dispatch) => {
  dispatch(estateTypesRequested());
  try {
    const { content } = await estateTypesService.get();
    dispatch(estateTypesReceived(content));
  } catch (error) {
    estateTypesFailed(error.message);
  }
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
