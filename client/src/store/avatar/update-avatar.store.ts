import { createSlice } from "@reduxjs/toolkit";

const updateUserAvatarSlice = createSlice({
  name: "updateUserAvatar",
  initialState: {
    entities: false,
  },
  reducers: {
    updateUserAvatarOpenSetted: (state, action) => {
      state.entities = action.payload;
    },
  },
});

const { reducer: updateUserAvatarReducer, actions } = updateUserAvatarSlice;

const { updateUserAvatarOpenSetted } = actions;

export const setUpdateUserAvatarOpenState = (payload) => (dispatch) => {
  dispatch(updateUserAvatarOpenSetted(payload));
};

export const getUpdateUserAvatarOpenState = () => (state) => {
  return state?.updateUserAvatar?.entities;
};


export default updateUserAvatarReducer;
