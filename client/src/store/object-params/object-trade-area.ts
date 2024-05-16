import { Dispatch, createSlice } from "@reduxjs/toolkit";
import { objectTradeAreaArray } from "@data/object/object-trade-area";

interface ITradeAreaStoreInitialState {
  entities: { _id: string; name: string }[];
}

interface IStoreState {
  tradeArea: ITradeAreaStoreInitialState;
}

const tradeAreaSlice = createSlice({
  name: "tradeArea",
  initialState: {
    entities: null
  },
  reducers: {
    tradeAreaLoaded: (state, action) => {
      state.entities = action.payload;
    }
  }
});

const { reducer: tradeAreaReducer, actions } = tradeAreaSlice;
const { tradeAreaLoaded } = actions;

export const loadTradeAreaList = () => async (dispatch: Dispatch) => {
  dispatch(tradeAreaLoaded(objectTradeAreaArray));
};

export const getTradeAreaList = () => (state: IStoreState) =>
  state.tradeArea.entities;

export const getTradeAreaNameById = (id: string) => (state: IStoreState) => {
  const tradeArea = state?.tradeArea?.entities?.find(
    (type) => type?._id === id
  );
  const result = tradeArea?.name;

  return result;
};

export default tradeAreaReducer;
