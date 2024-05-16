import { Dispatch, createSlice } from "@reduxjs/toolkit";
import { objectTypesArray } from "@data/object/object-types";

interface IObjectTypesStoreInitialState {
  entities: { _id: string; name: string }[];
}

interface IStoreState {
  objectTypes: IObjectTypesStoreInitialState;
}

const objectTypesSlice = createSlice({
  name: "objectTypes",
  initialState: {
    entities: null
  },
  reducers: {
    objectTypesLoaded: (state, action) => {
      state.entities = action.payload;
    }
  }
});

const { reducer: objectTypesReducer, actions } = objectTypesSlice;
const { objectTypesLoaded } = actions;

export const loadObjectTypesList = () => async (dispatch: Dispatch) => {
  dispatch(objectTypesLoaded(objectTypesArray));
};

export const getObjectTypesList = () => (state: IStoreState) =>
  state.objectTypes.entities;

export const getObjectTypeNameById = (id: string) => (state: IStoreState) => {
  const objectType = state?.objectTypes?.entities?.find(
    (type) => type?._id === id
  );
  const result = objectType?.name;

  return result;
};

export default objectTypesReducer;
