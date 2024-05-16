import { Dispatch, createSlice } from "@reduxjs/toolkit";
import { objectPropertiesArray } from "@data/object/object-properties";

interface IObjectPropertiesStoreInitialState {
  entities: { _id: string; name: string }[];
}

interface IStoreState {
  objectProperties: IObjectPropertiesStoreInitialState;
}

const objectPropertiesSlice = createSlice({
  name: "objectProperties",
  initialState: {
    entities: null
  },
  reducers: {
    objectPropertiesLoaded: (state, action) => {
      state.entities = action.payload;
    }
  }
});

const { reducer: objectPropertiesReducer, actions } = objectPropertiesSlice;
const { objectPropertiesLoaded } = actions;

export const loadObjectPropertiesList = () => async (dispatch: Dispatch) => {
  dispatch(objectPropertiesLoaded(objectPropertiesArray));
};

export const getObjectPropertiesList = () => (state: IStoreState) =>
  state.objectProperties.entities;

export const getObjectPropertiesNameById =
  (id: string) => (state: IStoreState) => {
    const rentType = state?.objectProperties?.entities?.find(
      (type) => type?._id === id
    );
    const result = rentType?.name;

    return result;
  };

export default objectPropertiesReducer;
