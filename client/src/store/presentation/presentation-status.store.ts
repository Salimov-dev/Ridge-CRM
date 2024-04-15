import { createSlice } from "@reduxjs/toolkit";
import { presentationStatusesArrray } from "../../data/presentations/presentations-status";

const presentationStatusSlice = createSlice({
  name: "presentationStatus",
  initialState: {
    entities: null
  },
  reducers: {
    presentationStatusLoaded: (state, action) => {
      state.entities = action.payload;
    }
  }
});

const { reducer: presentationStatusReducer, actions } = presentationStatusSlice;
const { presentationStatusLoaded } = actions;

export const loadPresentationStatusList = () => (dispatch) => {
  dispatch(presentationStatusLoaded(presentationStatusesArrray));
};

export const getPresentationStatusesList = () => (state) =>
  state.presentationStatus.entities;

export const getPresentationStatusById = (id) => (state) => {
  if (state?.presentationStatus.entities) {
    const status = state.presentationStatus.entities.find(
      (status) => status?._id === id
    );
    return status;
  }
};

export const getPresentationStatusNameById = (id) => (state) => {
  if (state?.presentationStatus.entities) {
    const obj = state.presentationStatus.entities.find(
      (status) => status?._id === id
    );
    const result = obj?.name;
    return result;
  }
};

export default presentationStatusReducer;
