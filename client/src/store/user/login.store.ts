import { createSlice } from "@reduxjs/toolkit";

const loginSlice = createSlice({
  name: "login",
  initialState: {
    entities: false,
  },
  reducers: {
    loginOpenSetted: (state, action) => {
      state.entities = action.payload;
    },
  },
});

const { reducer: loginReducer, actions } = loginSlice;

const { loginOpenSetted } = actions;

export const setLoginOpenState = (payload) => (dispatch) => {
  dispatch(loginOpenSetted(payload));
};

export const loadLoginOpenState = () => (state) => {
  return state?.login?.entities;
};

export const getLoginOpenState = () => (state) => {
  return state?.login?.entities;
};


export default loginReducer;
