import { contactPositionsArray } from "@data/users/contact-positions";
import { createSlice } from "@reduxjs/toolkit";

const contactPositionsSlice = createSlice({
  name: "contactPositions",
  initialState: {
    entities: null
  },
  reducers: {
    contactPositionsLoaded: (state, action) => {
      state.entities = action.payload;
    }
  }
});

const { reducer: contactPositionsReducer, actions } = contactPositionsSlice;
const { contactPositionsLoaded } = actions;

export const loadContactPositionsList = () => async (dispatch) => {
  dispatch(contactPositionsLoaded(contactPositionsArray));
};

export const getcontactPositionsList = () => (state) =>
  state.contactPositions.entities;

export const getPositionNameById = (id) => (state) => {
  if (state?.contactPositions?.entities) {
    return state?.contactPositions?.entities.find((pos) => pos?._id === id)
      ?.name;
  }
};

export default contactPositionsReducer;
