import { createSlice } from "@reduxjs/toolkit";
import { allDistrictsList } from "@utils/objects/get-finded-object-districts-list";

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
  dispatch(districtsLoaded(allDistrictsList()));
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
