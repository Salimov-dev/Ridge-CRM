import { createSlice } from "@reduxjs/toolkit";

import { userStatusesArray } from "../../data/users/user-statuses";

const userStatusesSlice = createSlice({
  name: "userStatuses",
  initialState: {
    entities: null,
  },
  reducers: {
    userStatusesLoaded: (state, action) => {
      state.entities = action.payload;
    },
  },
});

const { reducer: userStatusesReducer, actions } = userStatusesSlice;
const { userStatusesLoaded } = actions;

export const loadUserStatusesList = () => async (dispatch) => {
  dispatch(userStatusesLoaded(userStatusesArray));
};

export const getUserStatusesList = () => (state) =>
  state?.userStatuses.entities;

export const getUserStatusNameById = (id) => (state) => {
  const user = state?.userStatuses?.entities?.find((user) => user?._id === id);
  const result = user?.name;

  return result;
};

export default userStatusesReducer;
