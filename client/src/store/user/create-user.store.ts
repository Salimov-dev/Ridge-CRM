import { createSlice } from "@reduxjs/toolkit";

const createUserSlice = createSlice({
  name: "createUser",
  initialState: {
    entities: false,
  },
  reducers: {
    createUserOpenSetted: (state, action) => {
      state.entities = action.payload;
    },
  },
});

const { reducer: createUserReducer, actions } = createUserSlice;

const { createUserOpenSetted } = actions;

export const setCreateUserOpenState = (payload) => (dispatch) => {
  dispatch(createUserOpenSetted(payload));
};

export const loadCreateUserOpenState = () => (state) => {
  return state?.createUser?.entities;
};

export const getCreateUserOpenState = () => (state) => {
  return state?.createUser?.entities;
};


export default createUserReducer;
