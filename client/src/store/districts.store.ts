import { createSlice } from "@reduxjs/toolkit";
import districtsService from "../services/districts.service";

const districtsSlice = createSlice({
  name: "districts",
  initialState: {
    entities: null,
    isLoading: true,
    error: null,
  },
  reducers: {
    districtsRequested: (state) => {
      state.isLoading = true;
    },
    districtsReceived: (state, action) => {
      state.entities = action.payload;
      state.isLoading = false;
    },
    districtsFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

const { reducer: districtsReducer, actions } = districtsSlice;
const { districtsRequested, districtsReceived, districtsFailed } = actions;

export const loadDistrictsList = () => async (dispatch) => {
  dispatch(districtsRequested());
  try {
    const { content } = await districtsService.get();
    dispatch(districtsReceived(content));
  } catch (error) {
    districtsFailed(error.message);
  }
};

export const getDistrictsList = () => (state) => state.districts.entities;

export const getDistrictsStatus = () => (state) => state.districts.isLoading;

export const getDistrictById = (id) => (state) => {
  const district = state?.districts?.entities?.find((dist) => dist?._id === id);
  const result = district?.name;

  return result;
};


export default districtsReducer;
