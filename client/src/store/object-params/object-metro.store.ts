import { Dispatch, createSlice } from "@reduxjs/toolkit";
import { metroListArraySPB } from "@data/metro/metro-spb";
import { metroListArrayMSK } from "@data/metro/metro-msk";
import { metroListArrayKZN } from "@data/metro/metro-kzn";

interface IMetroStoreInitialState {
  entities: { _id: string; name: string }[];
}

interface IStoreState {
  metro: IMetroStoreInitialState;
}

const metroSlice = createSlice({
  name: "metro",
  initialState: {
    entities: []
  },
  reducers: {
    metroListLoaded: (state, action) => {
      state.entities = action.payload;
    }
  }
});

const { reducer: metroReducer, actions } = metroSlice;
const { metroListLoaded } = actions;

export const loadMetroList = () => async (dispatch: Dispatch) => {
  dispatch(
    metroListLoaded([
      ...metroListArraySPB,
      ...metroListArrayMSK,
      ...metroListArrayKZN
    ])
  );
};

export const getMetroList = () => (state: IStoreState) => state.metro.entities;

export const getMetroName =
  (metroStationId: string) => (state: IStoreState) => {
    const metro = state.metro.entities.filter((m) => m._id === metroStationId);
    const result = metro[0]?.name;

    return result;
  };

export default metroReducer;
