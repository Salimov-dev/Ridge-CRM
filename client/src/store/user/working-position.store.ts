import workingPositionService from "../../services/user/working-position.service";
import { createSlice } from "@reduxjs/toolkit";
import isOutDated from "../../utils/is-out-date";

const workingPositionSlice = createSlice({
  name: "workingPosition",
  initialState: {
    entities: null,
    isLoading: true,
    error: null,
    lastFetch: null,
  },
  reducers: {
    workingPositionRequested: (state) => {
      state.isLoading = true;
    },
    workingPositionReceived: (state, action) => {
      state.entities = action.payload;
      state.isLoading = false;
    },
    workingPositionFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

const { reducer: workingPositionReducer, actions } = workingPositionSlice;
const {
  workingPositionRequested,
  workingPositionReceived,
  workingPositionFailed,
} = actions;

export const loadWorkingPositionList = () => async (dispatch, getState) => {
  const { lastFetch } = getState().workingPosition;
  if (isOutDated(lastFetch)) {
    dispatch(workingPositionRequested());
    try {
      const { content } = await workingPositionService.get();
      dispatch(workingPositionReceived(content));
    } catch (error) {
      workingPositionFailed(error.message);
    }
  }
};

export const getWorkingPositionsList = () => (state) =>
  state.workingPosition.entities;

export const getWorkingPositionStatus = () => (state) =>
  state.workingPosition.isLoading;

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
