import { createSlice } from "@reduxjs/toolkit";
import districtsService from "../../services/object/districts.service";
import { districtsSPB } from "../../mock/districts/districts-spb";
import { districtsMSK } from "../../mock/districts/districts-msk";

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
  const districtsFullArray = [...districtsSPB, ...districtsMSK];
  dispatch(districtsReceived(districtsFullArray));
};

export const getDistrictsList = () => (state) => state.districts.entities;

export const getDistrictsStatus = () => (state) => state.districts.isLoading;

export const getDistrictById = (id) => (state) => {
  const district = state?.districts?.entities?.find((dist) => dist?._id === id);
  const result = district?.name;

  return result;
};

export const getDistrictName = (district) => (state) => {
  const idRegex = /^[0-9a-fA-F]+$/;

  if (idRegex.test(district)) {
    const currentDistrict = state?.districts?.entities?.find(
      (dist) => dist?._id === district
    );
    return currentDistrict?.name;
  } else {
    return district;
  }
};

export default districtsReducer;
