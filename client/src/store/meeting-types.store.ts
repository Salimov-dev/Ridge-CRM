import { createSlice } from "@reduxjs/toolkit";
import meetingTypesService from "../services/meeting-type.service";

const meetingTypesSlice = createSlice({
  name: "meetingTypes",
  initialState: {
    entities: null,
    isLoading: true,
    error: null,
  },
  reducers: {
    meetingTypesRequested: (state) => {
      state.isLoading = true;
    },
    meetingTypesReceived: (state, action) => {
      state.entities = action.payload;
      state.isLoading = false;
    },
    meetingTypesFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

const { reducer: meetingTypesReducer, actions } = meetingTypesSlice;
const { meetingTypesRequested, meetingTypesReceived, meetingTypesFailed } = actions;

export const loadMeetingTypesList = () => async (dispatch) => {
  dispatch(meetingTypesRequested());
  try {
    const { content } = await meetingTypesService.get();
    dispatch(meetingTypesReceived(content));
  } catch (error) {
    meetingTypesFailed(error.message);
  }
};

export const getMeetingTypesList = () => (state) => state.meetingTypes.entities;

export const getMeetingTypesStatus = () => (state) => state.meetingTypes.isLoading;

export const getMeetingTypeNameById = (id) => (state) => {
  const meetingType = state?.meetingTypes?.entities?.find((type) => type?._id === id);
  const result = meetingType?.name;

  return result;
};


export default meetingTypesReducer;
