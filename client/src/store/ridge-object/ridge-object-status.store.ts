import { createSlice } from "@reduxjs/toolkit";
import ridgeObjectStatusService from "../../services/ridge/ridge-object-status.service";

const ridgeObjectStatusSlice = createSlice({
  name: "ridgeObjectStatus",
  initialState: {
    entities: null,
    isLoading: true,
    error: null,
    lastFetch: null,
  },
  reducers: {
    ridgeObjectStatusRequested: (state) => {
      state.isLoading = true;
    },
    ridgeObjectStatusReceived: (state, action) => {
      state.entities = action.payload;
      state.isLoading = false;
    },
    ridgeObjectStatusFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

const { reducer: ridgeObjectStatusReducer, actions } = ridgeObjectStatusSlice;
const { ridgeObjectStatusRequested, ridgeObjectStatusReceived, ridgeObjectStatusFailed } =
  actions;

export const loadRidgeObjectStatusList = () => async (dispatch) => {
  dispatch(ridgeObjectStatusRequested());
  try {
    const { content } = await ridgeObjectStatusService.get();
    dispatch(ridgeObjectStatusReceived(content));
  } catch (error) {
    ridgeObjectStatusFailed(error.message);
  }
};

export const getRidgeObjectsStatusList = () => (state) =>
  state.ridgeObjectStatus.entities;

export const getRidgeObjectStatusLoading = () => (state) =>
  state.ridgeObjectStatus.isLoading;

export const getRidgeObjectStatusNameById = (id) => (state) => {
  if (state?.ridgeObjectStatus.entities) {
    const obj = state.ridgeObjectStatus.entities.filter(
      (status) => status?._id === id
    );
    const result = obj[0]?.name;
    return result;
  }
};

export default ridgeObjectStatusReducer;
