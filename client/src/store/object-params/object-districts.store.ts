import { Dispatch, createSlice } from "@reduxjs/toolkit";
import { allDistrictsList } from "@utils/objects/get-finded-object-districts-list";

interface IDistrictsStoreInitialState {
  entities: { _id: string; name: string }[];
}

interface IStoreState {
  districts: IDistrictsStoreInitialState;
}

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

export const loadDistrictsList = () => async (dispatch: Dispatch) => {
  dispatch(districtsLoaded(allDistrictsList()));
};

export const getDistrictsList = () => (state: IStoreState) =>
  state.districts.entities;

export const getDistrictName = (district: string) => (state: IStoreState) => {
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
