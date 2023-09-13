import { createSlice } from "@reduxjs/toolkit";
import dealStagesService from "../../services/deal/deal-stages.service";


const dealStagesSlice = createSlice({
  name: "dealStages",
  initialState: {
    entities: null,
    isLoading: true,
    error: null,
  },
  reducers: {
    dealStagesRequested: (state) => {
      state.isLoading = true;
    },
    dealStagesReceived: (state, action) => {
      state.entities = action.payload;
      state.isLoading = false;
    },
    dealStagesFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

const { reducer: dealStagesReducer, actions } = dealStagesSlice;
const { dealStagesRequested, dealStagesReceived, dealStagesFailed } = actions;

export const loadDealStagesList = () => async (dispatch) => {
  dispatch(dealStagesRequested());
  try {
    const { content } = await dealStagesService.get();
    dispatch(dealStagesReceived(content));
  } catch (error) {
    dealStagesFailed(error.message);
  }
};

export const getDealStagesList = () => (state) => state.dealStages.entities;

export const getDealStagesLoadingStatus = () => (state) =>
  state.dealStages.isLoading;

export const getDealStageNameById = (id) => (state) => {
  const dealStage = state?.dealStages?.entities?.find(
    (type) => type?._id === id
  );
  const result = dealStage?.name;

  return result;
};

export default dealStagesReducer;
