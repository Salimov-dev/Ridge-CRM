import { createSlice } from "@reduxjs/toolkit";
import { objectStatusesArray } from "../../mock/object/object-status.ts";

const objectStatusSlice = createSlice({
  name: "objectStatus",
  initialState: {
    entities: null,
    isLoading: true,
    error: null,
    lastFetch: null,
  },
  reducers: {
    objectStatusRequested: (state) => {
      state.isLoading = true;
    },
    objectStatusReceived: (state, action) => {
      state.entities = action.payload;
      state.isLoading = false;
    },
    objectStatusFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

const { reducer: objectStatusReducer, actions } = objectStatusSlice;
const { objectStatusReceived } =
  actions;

export const loadObjectStatusList = () => (dispatch) => {
  dispatch(objectStatusReceived(objectStatusesArray));
};

export const getObjectsStatusList = () => (state) =>
  state.objectStatus.entities;

export const getObjectStatusLoading = () => (state) =>
  state.objectStatus.isLoading;

export const getObjectStatusNameById = (id) => (state) => {
  if (state?.objectStatus.entities) {
    const obj = state.objectStatus.entities.find(
      (status) => status?._id === id
    );
    const result = obj?.name;
    return result;
  }
};

export default objectStatusReducer;
