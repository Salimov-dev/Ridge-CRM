import { createSlice } from "@reduxjs/toolkit";
import { objectConditionsArray } from "../../mock/object/object-conditions";

const objectConditionsSlice = createSlice({
  name: "objectConditions",
  initialState: {
    entities: null,
    isLoading: true,
    error: null,
  },
  reducers: {
    objectConditionsRequested: (state) => {
      state.isLoading = true;
    },
    objectConditionsReceived: (state, action) => {
      state.entities = action.payload;
      state.isLoading = false;
    },
    objectConditionsFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

const { reducer: objectConditionsReducer, actions } = objectConditionsSlice;
const {
  objectConditionsReceived,
} = actions;

export const loadObjectConditionsList = () =>  (dispatch) => {
    dispatch(objectConditionsReceived(objectConditionsArray));
};

export const getObjectConditionsList = () => (state) =>
  state.objectConditions.entities;

export const getObjectConditionsStatus = () => (state) =>
  state.objectConditions.isLoading;

export const getEstateConditionNameById = (id) => (state) => {
  const objectConditions = state?.objectConditions?.entities?.find(
    (cond) => cond?._id === id
  );
  const result = objectConditions?.name;

  return result;
};

export default objectConditionsReducer;
