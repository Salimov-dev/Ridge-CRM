import { createSlice } from "@reduxjs/toolkit";

const sidebarCollapsStateSlice = createSlice({
  name: "sidebarCollaps",
  initialState: {
    entities: false,
  },
  reducers: {
    sidebarCollapsStateSetted: (state, action) => {
      state.entities = action.payload;
    },
  },
});

const { reducer: sidebarCollapsStateReducer, actions } =
  sidebarCollapsStateSlice;

const { sidebarCollapsStateSetted } = actions;

export const loadSidebarCollapsState = () => (dispatch) => {
  const localStorageValue = localStorage.getItem("sidebar-collaps-state");
  if (localStorageValue) {
    return dispatch(sidebarCollapsStateSetted(localStorageValue));
  } else {
    localStorage.setItem("sidebar-collaps-state", false);
  }
};

export const setSidebarCollapsState = (query) => (dispatch) => {
  dispatch(sidebarCollapsStateSetted(query));
  localStorage.setItem("sidebar-collaps-state", query);
};

export const getSidebarCollapsState = () => (state) =>
  state.sidebarCollapsState.entities;

export default sidebarCollapsStateReducer;
