import { createAction, createSlice } from "@reduxjs/toolkit";
import isOutDated from "../../utils/auth/is-out-date";
import localStorageService from "../../services/user/local.storage-service";
import dealsService from "../../services/deal/deal.service";

const initialState = localStorageService.getAccessToken()
  ? {
      entities: null,
      isLoading: true,
      error: null,
      isLoggedIn: true,
      dataLoaded: false,
      lastFetch: null,
    }
  : {
      entities: null,
      isLoading: false,
      error: null,
      isLoggedIn: false,
      dataLoaded: false,
      lastFetch: null,
    };

const dealsSlice = createSlice({
  name: "deals",
  initialState,
  reducers: {
    dealsRequested: (state) => {
      state.isLoading = true;
    },
    dealsReceived: (state, action) => {
      state.entities = action.payload;
      state.dataLoaded = true;
      state.isLoading = false;
    },
    dealsFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    dealCreated: (state, action) => {
      if (!Array.isArray(state.entities)) {
        state.entities = [];
      }
      state.entities.push(action.payload);
    },
    dealUpdateSuccessed: (state, action) => {
      state.entities[
        state.entities.findIndex((m) => m._id === action.payload._id)
      ] = action.payload;
    },
    dealRemoved: (state, action) => {
      state.entities = state.entities.filter(
        (contact) => contact._id !== action.payload
      );
    },
  },
});

const dealCreateRequested = createAction("deals/dealsCreateRequested");
const createDealFailed = createAction("deals/createDealFailed");
const dealUpdateRequested = createAction("deals/dealUpdateRequested");
const dealUpdateFailed = createAction("deals/dealUpdateFailed");
const removeDealRequested = createAction("deals/removeDealRequested");
const removeDealFailed = createAction("deals/removeDealFailed");

const { reducer: dealsReducer, actions } = dealsSlice;
const {
  dealsRequested,
  dealsReceived,
  dealsFailed,
  dealCreated,
  dealUpdateSuccessed,
  dealRemoved,
} = actions;

export const loadDealsList = () => async (dispatch, getState) => {
  // const { lastFetch } = getState().deals;
  // if (isOutDated(lastFetch)) {
    dispatch(dealsRequested());
    try {
      const { content } = await dealsService.get();
      dispatch(dealsReceived(content));
    } catch (error) {
      dealsFailed(error.message);
    }
  // }
};

export function createDeal(payload) {
  return async function (dispatch) {
    dispatch(dealCreateRequested());
    try {
      const { content } = await dealsService.create(payload);
      dispatch(dealCreated(content));
    } catch (error) {
      dispatch(createDealFailed(error.message));
    }
  };
}

export const updateDeal = (payload) => async (dispatch) => {
  dispatch(dealUpdateRequested());
  try {
    dispatch(dealUpdateSuccessed(payload));
    await dealsService.update(payload);
  } catch (error) {
    dispatch(dealUpdateFailed(error.message));
  }
};

export const removeDeal = (dealsId) => async (dispatch) => {
  dispatch(removeDealRequested());

  try {
    dispatch(dealRemoved(dealsId));
    await dealsService.remove(dealsId);
  } catch (error) {
    dispatch(removeDealFailed(error.message));
  }
};

export const getDealById = (dealId) => (state) => {
  if (state?.deals?.entities) {
    return state?.deals?.entities?.find((deal) => deal?._id === dealId);
  }
};

export const getDealsList = () => (state) => state.deals.entities;

export const getDealsLoadingStatus = () => (state) => state.deals.isLoading;

export default dealsReducer;
