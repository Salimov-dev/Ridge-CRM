import { Dispatch, createSlice } from "@reduxjs/toolkit";
import { objectStatusesArray } from "@data/object/object-status.ts";

interface IObjectStatusStoreInitialState {
  entities: { _id: string; name: string }[];
}

interface IStoreState {
  objectStatus: IObjectStatusStoreInitialState;
}

const objectStatusSlice = createSlice({
  name: "objectStatus",
  initialState: {
    entities: null
  },
  reducers: {
    objectStatusLoaded: (state, action) => {
      state.entities = action.payload;
    }
  }
});

const { reducer: objectStatusReducer, actions } = objectStatusSlice;
const { objectStatusLoaded } = actions;

export const loadObjectStatusList = () => (dispatch: Dispatch) => {
  dispatch(objectStatusLoaded(objectStatusesArray));
};

export const getObjectsStatusList = () => (state: IStoreState) =>
  state.objectStatus.entities;

export const getObjectStatusNameById = (id: string) => (state: IStoreState) => {
  if (state?.objectStatus.entities) {
    const obj = state.objectStatus.entities.find(
      (status) => status?._id === id
    );
    const result = obj?.name;
    return result;
  }
};

export default objectStatusReducer;
