import { createSlice } from "@reduxjs/toolkit";
import { districtsSPB } from "../../data/districts/districts-Spb";
import { districtsMSK } from "../../data/districts/districts-Msk";

const districtsSlice = createSlice({
  name: "districts",
  initialState: {
    entities: null
  },
  reducers: {
    districtsLoaded: (state, action) => {
      state.entities = action.payload;
    }
  }
});

const { reducer: districtsReducer, actions } = districtsSlice;
const { districtsLoaded } = actions;

export const loadDistrictsList = () => async (dispatch) => {
  const districtsFullArray = [...districtsSPB, ...districtsMSK];
  dispatch(districtsLoaded(districtsFullArray));
};

export const getDistrictsList = () => (state) => state.districts.entities;

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
