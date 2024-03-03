import { userRolesArray } from "@data/users/user-roles";
import { createSlice } from "@reduxjs/toolkit";

const userRolesSlice = createSlice({
  name: "userRoles",
  initialState: {
    entities: null
  },
  reducers: {
    userRolesLoaded: (state, action) => {
      state.entities = action.payload;
    }
  }
});

const { reducer: userRolesReducer, actions } = userRolesSlice;
const { userRolesLoaded } = actions;

export const loadUserRolesList = () => async (dispatch) => {
  dispatch(userRolesLoaded(userRolesArray));
};

export const getUserRolesList = () => (state) => state?.userRoles.entities;

export const getUserRolNameById = (id) => (state) => {
  const user = state?.userRoles?.entities?.find((user) => user?._id === id);
  const result = user?.name;

  return result;
};

export default userRolesReducer;
