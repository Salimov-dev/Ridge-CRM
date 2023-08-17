import { createSlice } from "@reduxjs/toolkit";
import objectConditionsService from "../services/estate-conditions.service";

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
  objectConditionsRequested,
  objectConditionsReceived,
  objectConditionsFailed,
} = actions;

export const loadObjectConditionsList = () => async (dispatch) => {
  dispatch(objectConditionsRequested());
  try {
    const { content } = await objectConditionsService.get();
    dispatch(objectConditionsReceived(content));
  } catch (error) {
    objectConditionsFailed(error.message);
  }
};

export const getobjectConditionsList = () => (state) =>
  state.objectConditions.entities;

export const getobjectConditionsStatus = () => (state) =>
  state.objectConditions.isLoading;

export const getEstateConditionNameById = (id) => (state) => {
  const objectConditions = state?.objectConditions?.entities?.find(
    (cond) => cond?._id === id
  );
  const result = objectConditions?.name;

  return result;
};

export default objectConditionsReducer;
