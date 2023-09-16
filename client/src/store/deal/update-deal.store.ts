import { createSlice } from "@reduxjs/toolkit";

const updateDealSlice = createSlice({
  name: "updateDeal",
  initialState: {
    entities: false,
    dealId: "",
  },
  reducers: {
    updateDealOpenSetted: (state, action) => {
      state.entities = action.payload;
    },
    updateDealId: (state, action) => {
      state.dealId = action.payload;
    },
  },
});

const { reducer: updateDealReducer, actions } = updateDealSlice;

const { updateDealOpenSetted, updateDealId } = actions;

export const setUpdateDealOpenState = (payload) => (dispatch) => {
  dispatch(updateDealOpenSetted(payload));
};

export const setUpdateDealId = (payload) => (dispatch) => {
  dispatch(updateDealId(payload));
};

export const loadUpdateDealOpenState = () => (state) => {
  return state?.updateDeal?.entities;
};

export const getUpdateDealId = () => (state) => {
  return state.updateDeal.dealId;
};

export default updateDealReducer;
