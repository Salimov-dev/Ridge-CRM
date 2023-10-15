import { createSlice } from "@reduxjs/toolkit";
import { meetingTypesArray } from "../../mock/meetings/meeting-types";

const meetingTypesSlice = createSlice({
  name: "meetingTypes",
  initialState: {
    entities: null,
  },
  reducers: {
    meetingTypesLoaded: (state, action) => {
      state.entities = action.payload;
    },
  },
});

const { reducer: meetingTypesReducer, actions } = meetingTypesSlice;
const { meetingTypesLoaded } = actions;

export const loadMeetingTypesList = () => async (dispatch) => {
  dispatch(meetingTypesLoaded(meetingTypesArray));
};

export const getMeetingTypesList = () => (state) => state.meetingTypes.entities;

export const getMeetingTypeNameById = (id) => (state) => {
  const meetingType = state?.meetingTypes?.entities?.find(
    (type) => type?._id === id
  );
  const result = meetingType?.name;

  return result;
};

export default meetingTypesReducer;
