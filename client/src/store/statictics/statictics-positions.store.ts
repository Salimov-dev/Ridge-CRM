import { createSlice } from "@reduxjs/toolkit";

const staticticPositionsSlice = createSlice({
  name: "staticticPositions",
  initialState: {
    entities: [],
  },
  reducers: {
    staticticPositionsSetted: (state, action) => {
      state.entities = action.payload;
    },
  },
});

const { reducer: staticticPositionsReducer, actions } = staticticPositionsSlice;

const { staticticPositionsSetted } = actions;

export const setStaticticPositions = (payload) => (dispatch) => {
  dispatch(staticticPositionsSetted(payload));
};

export const loadStaticticPositions = () => (state) => {
  return state?.staticticPositions?.entities;
};

export const getStaticticPositions = () => (state) => {
  return state?.staticticPositions?.entities;
};

export default staticticPositionsReducer;
