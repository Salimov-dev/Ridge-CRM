import { createSlice } from "@reduxjs/toolkit";

const CreateDealSlice = createSlice({
  name: "CreateDeal",
  initialState: {
    entities: false,
    stageId: "",
  },
  reducers: {
    CreateDealOpenSetted: (state, action) => {
      state.entities = action.payload;
    },
    updateStageId: (state, action) => {
      state.stageId = action.payload;
    },
  },
});

const { reducer: CreateDealReducer, actions } = CreateDealSlice;

const { CreateDealOpenSetted, updateStageId } = actions;

export const setCreateDealOpenState = (payload) => (dispatch) => {
  dispatch(CreateDealOpenSetted(payload));
};

export const loadCreateDealOpenState = () => (state) => {
  return state?.CreateDeal?.entities;
};

export const getCreateDealOpenState = () => (state) => {
  return state?.CreateDeal.entities;
};

export const setCreateDealStageId = (payload) => (dispatch) => {
  dispatch(updateStageId(payload));
};

export const getCreateDealStageId = () => (state) => {
  return state.CreateDeal.stageId;
};

export default CreateDealReducer;
