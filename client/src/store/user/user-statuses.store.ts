import { createSlice } from "@reduxjs/toolkit";
import userStatusService from "../../services/user/user-status.service";

const userStatusesSlice = createSlice({
  name: "userStatuses",
  initialState: {
    entities: null,
    isLoading: true,
    error: null,
  },
  reducers: {
    userStatusesRequested: (state) => {
      state.isLoading = true;
    },
    userStatusesReceived: (state, action) => {
      state.entities = action.payload;
      state.isLoading = false;
    },
    userStatusesFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

const { reducer: userStatusesReducer, actions } = userStatusesSlice;
const { userStatusesRequested, userStatusesReceived, userStatusesFailed } =
  actions;

export const loadUserStatusesList = () => async (dispatch) => {
  dispatch(userStatusesRequested());
  try {
    const { content } = await userStatusService.get();
    dispatch(userStatusesReceived(content));
  } catch (error) {
    userStatusesFailed(error.message);
  }
};

export const getUserStatusesList = () => (state) =>
  state?.userStatuses.entities;

export const getUserStatusesStatus = () => (state) =>
  state.userStatuses.isLoading;

export const getUserStatusNameById = (id) => (state) => {
  const user = state?.userStatuses?.entities?.find((user) => user?._id === id);
  const result = user?.name;

  return result;
};

export default userStatusesReducer;
