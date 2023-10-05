import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "authState",
  initialState: {
    state: false,
  },
  reducers: {
    authSetted: (state, action) => {
      state.state = action.payload;
    },
  },
});

const { reducer: authStateReducer, actions } = authSlice;

const { authSetted } = actions;

export const loadAuthState = (state) => (dispatch) => {
  dispatch(authSetted(state))
};

export const setAuthState = (payload) => (dispatch) => {
  dispatch(authSetted(payload));
};

export const getAuthState = () => (state) => state.authState.state;

export default authStateReducer;