import { createSlice } from "@reduxjs/toolkit";
import { objectStatusesArray } from "../../mock/object/object-status.ts";

const objectStatusSlice = createSlice({
  name: "objectStatus",
  initialState: {
    entities: null,
  },
  reducers: {
    objectStatusLoaded: (state, action) => {
      state.entities = action.payload;
    },
  },
});

const { reducer: objectStatusReducer, actions } = objectStatusSlice;
const { objectStatusLoaded } =
  actions;

export const loadObjectStatusList = () => (dispatch) => {
  dispatch(objectStatusLoaded(objectStatusesArray));
};

export const getObjectsStatusList = () => (state) =>
  state.objectStatus.entities;

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
