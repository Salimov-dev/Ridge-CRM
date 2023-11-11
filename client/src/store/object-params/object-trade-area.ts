import { createSlice } from "@reduxjs/toolkit";
import { objectTradeAreaArray } from "../../mock/object/object-trade-area"; 

const tradeAreaSlice = createSlice({
  name: "tradeArea",
  initialState: {
    entities: null,
  },
  reducers: {
    tradeAreaLoaded: (state, action) => {
      state.entities = action.payload;
    },
  },
});

const { reducer: tradeAreaReducer, actions } = tradeAreaSlice;
const { tradeAreaLoaded } = actions;

export const loadTradeAreaList = () => async (dispatch) => {
  dispatch(tradeAreaLoaded(objectTradeAreaArray));
};

export const getTradeAreaList = () => (state) => state.tradeArea.entities;

export const getTradeAreaNameById = (id) => (state) => {
  const tradeArea = state?.tradeArea?.entities?.find((type) => type?._id === id);
  const result = tradeArea?.name;

  return result;
};

export default tradeAreaReducer;
