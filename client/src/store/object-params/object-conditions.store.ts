import { Dispatch, createSlice } from "@reduxjs/toolkit";
import { objectConditionsArray } from "@data/object/object-conditions";

interface IObjectConditionsStoreInitialState {
  entities: { _id: string; name: string }[];
}

interface IStoreState {
  objectConditions: IObjectConditionsStoreInitialState;
}

const objectConditionsSlice = createSlice({
  name: "objectConditions",
  initialState: {
    entities: null
  },
  reducers: {
    objectConditionsLoaded: (state, action) => {
      state.entities = action.payload;
    }
  }
});

const { reducer: objectConditionsReducer, actions } = objectConditionsSlice;
const { objectConditionsLoaded } = actions;

export const loadObjectConditionsList = () => (dispatch: Dispatch) => {
  dispatch(objectConditionsLoaded(objectConditionsArray));
};

export const getObjectConditionsList = () => (state: IStoreState) =>
  state.objectConditions.entities;

export const getEstateConditionNameById =
  (id: string) => (state: IStoreState) => {
    const objectConditions = state?.objectConditions?.entities?.find(
      (cond) => cond?._id === id
    );
    const result = objectConditions?.name;

    return result;
  };

export default objectConditionsReducer;
