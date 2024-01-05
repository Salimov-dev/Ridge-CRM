import { createSlice } from "@reduxjs/toolkit";
import { workingPositionsArray } from "../../data/users/working-positions";

const workingPositionSlice = createSlice({
  name: "workingPosition",
  initialState: {
    entities: null,
  },
  reducers: {
    workingPositionLoaded: (state, action) => {
      state.entities = action.payload;
    },
  },
});

const { reducer: workingPositionReducer, actions } = workingPositionSlice;
const { workingPositionLoaded } = actions;

export const loadWorkingPositionList = () => async (dispatch) => {
  dispatch(workingPositionLoaded(workingPositionsArray));
};

export const getWorkingPositionsList = () => (state) =>
  state.workingPosition.entities;

export const getWorkingPositionById = (id) => (state) => {
  if (state.workingPosition.entities) {
    return state.workingPosition.entities.find((prof) => prof._id === id);
  }
};

export const getWorkingPositionNameById = (id) => (state) => {
  if (state?.workingPosition.entities) {
    return state?.workingPosition?.entities.find((prof) => prof._id === id)
      ?.name;
  }
};

export default workingPositionReducer;
