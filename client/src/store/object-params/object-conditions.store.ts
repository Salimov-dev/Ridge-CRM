import { createSlice } from "@reduxjs/toolkit";
import { objectConditionsArray } from "../../data/object/object-conditions";

const objectConditionsSlice = createSlice({
  name: "objectConditions",
  initialState: {
    entities: null,
  },
  reducers: {
    objectConditionsLoaded: (state, action) => {
      state.entities = action.payload;
    },
  },
});

const { reducer: objectConditionsReducer, actions } = objectConditionsSlice;
const { objectConditionsLoaded } = actions;

export const loadObjectConditionsList = () => (dispatch) => {
  dispatch(objectConditionsLoaded(objectConditionsArray));
};

export const getObjectConditionsList = () => (state) =>
  state.objectConditions.entities;

export const getEstateConditionNameById = (id) => (state) => {
  const objectConditions = state?.objectConditions?.entities?.find(
    (cond) => cond?._id === id
  );
  const result = objectConditions?.name;

  return result;
};

export default objectConditionsReducer;
