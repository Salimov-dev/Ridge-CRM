import { citiesArray } from "@data/cities";
import { createSlice } from "@reduxjs/toolkit";

const citiesSlice = createSlice({
  name: "cities",
  initialState: {
    entities: null
  },
  reducers: {
    citiesLoaded: (state, action) => {
      state.entities = action.payload;
    }
  }
});

const { reducer: citiesReducer, actions } = citiesSlice;
const { citiesLoaded } = actions;

export const loadCitiesList = () => (dispatch) => {
  dispatch(citiesLoaded(citiesArray));
};

export const getCititesList = () => (state) => state.cities.entities;

export const getCityNameById = (id) => (state) => {
  if (state?.cities.entities) {
    const city = state.cities.entities.find((city) => city?._id === id);
    const result = city?.name;
    return result;
  }
};

export default citiesReducer;
