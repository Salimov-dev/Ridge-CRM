import { io } from "socket.io-client";
import { createSelector } from "reselect";
import { Dispatch, createAction, createSlice } from "@reduxjs/toolkit";
// utils
import isOutDated from "@utils/auth/is-out-date";
// services
import localStorageService from "@services/local-storage/local.storage-service";
import meetingsService from "@services/meeting/meetings.service";
// config
import configFile from "@config/config.json";
import { IMeeting } from "@interfaces/meeting/meeting.interface";

const socket = io(configFile.ioEndPoint);

interface IMeetingStoreInitialState {
  entities: IMeeting[];
  isLoading: boolean;
  error: any;
  isLoggedIn: boolean;
  dataLoaded: boolean;
  lastFetch: string | null;
}

interface IStoreState {
  meetings: IMeetingStoreInitialState;
}

const initialState: IMeetingStoreInitialState =
  localStorageService.getAccessToken()
    ? {
        entities: [],
        isLoading: true,
        error: null,
        isLoggedIn: true,
        dataLoaded: false,
        lastFetch: null
      }
    : {
        entities: [],
        isLoading: false,
        error: null,
        isLoggedIn: false,
        dataLoaded: false,
        lastFetch: null
      };

const meetingsSlice = createSlice({
  name: "meetings",
  initialState,
  reducers: {
    meetingsRequested: (state) => {
      state.isLoading = true;
    },
    meetingsReceived: (state, action) => {
      state.entities = action.payload;
      state.dataLoaded = true;
      state.isLoading = false;
    },
    meetingsFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    meetingCreated: (state, action) => {
      const newMeeting = action.payload;
      if (!state.entities.some((meeting) => meeting._id === newMeeting._id)) {
        state.entities.push(newMeeting);
      }
    },
    meetingUpdateSuccessed: (state, action) => {
      state.entities[
        state.entities.findIndex((m) => m._id === action.payload._id)
      ] = action.payload;
    },
    meetingRemoved: (state, action) => {
      state.entities = state.entities.filter(
        (meet) => meet._id !== action.payload
      );
    }
  }
});

const meetingCreateRequested = createAction("meetings/meetingCreateRequested");
const createMeetingFailed = createAction("meetings/createMeetingFailed");
const meetingUpdateRequested = createAction("meetings/meetingUpdateRequested");
const meetingUpdateFailed = createAction("meetings/meetingUpdateFailed");
const removeMeetingRequested = createAction("meetings/removeMeetingRequested");
const removeMeetingFailed = createAction("meetings/removeMeetingFailed");

const { reducer: meetingsReducer, actions } = meetingsSlice;
const {
  meetingsRequested,
  meetingsReceived,
  meetingsFailed,
  meetingCreated,
  meetingUpdateSuccessed,
  meetingRemoved
} = actions;

export const loadMeetingsList =
  () =>
  async (
    dispatch: Dispatch,
    getState: () => { (): any; new (): any; meetings: { lastFetch: any } }
  ) => {
    const { lastFetch } = getState().meetings;

    if (isOutDated(lastFetch)) {
      dispatch(meetingsRequested());
      try {
        const { content } = await meetingsService.get();
        dispatch(meetingsReceived(content));
      } catch (error: any) {
        meetingsFailed(error.message);
      }
    }
  };

export function createMeeting(payload: IMeeting) {
  return async function (dispatch: Dispatch) {
    dispatch(meetingCreateRequested());
    try {
      const { content } = await meetingsService.create(payload);
      socket.emit("meetingCreated", content);
    } catch (error: any) {
      dispatch(createMeetingFailed(error.message));
    }
  };
}

export function createMeetingUpdate(payload: IMeeting) {
  return async function (dispatch: Dispatch) {
    dispatch(meetingCreateRequested());
    try {
      dispatch(meetingCreated(payload));
    } catch (error: any) {
      dispatch(createMeetingFailed(error.message));
    }
  };
}

export const updateMeeting =
  (payload: IMeeting) => async (dispatch: Dispatch) => {
    dispatch(meetingUpdateRequested());
    try {
      await meetingsService.update(payload);
      socket.emit("meetingUpdated", payload);
    } catch (error: any) {
      dispatch(meetingUpdateFailed(error.message));
    }
  };

export const updateMeetingUpdate =
  (payload: IMeeting) => async (dispatch: Dispatch) => {
    dispatch(meetingUpdateRequested());
    try {
      dispatch(meetingUpdateSuccessed(payload));
    } catch (error: any) {
      dispatch(meetingUpdateFailed(error.message));
    }
  };

export const removeMeeting =
  (meetingId: string) => async (dispatch: Dispatch) => {
    dispatch(removeMeetingRequested());
    try {
      await meetingsService.remove(meetingId);
      socket.emit("meetingDeleted", meetingId);
    } catch (error: any) {
      dispatch(removeMeetingFailed(error.message));
    }
  };

export const removeMeetingUpdate =
  (meetingId: string) => async (dispatch: Dispatch) => {
    dispatch(removeMeetingRequested());
    try {
      dispatch(meetingRemoved(meetingId));
    } catch (error: any) {
      dispatch(removeMeetingFailed(error.message));
    }
  };

export const getObjectMeetingsList = (objectId: string) =>
  createSelector(
    (state: IStoreState) => state?.meetings?.entities,
    (meetings) => meetings?.filter((meet) => meet?.objectId === objectId)
  );

export const getMeetingById = (meetingId: string) => (state: IStoreState) => {
  if (state.meetings.entities) {
    return state.meetings.entities.find(
      (meet: IMeeting) => meet._id === meetingId
    );
  }
};

export const getMeetingsByObjectId =
  (objectId: string) => (state: IStoreState) => {
    if (state.meetings.entities) {
      return state.meetings.entities.filter(
        (meet) => meet.objectId === objectId
      );
    }
  };

export const getMeetingsList = () => (state: IStoreState) =>
  state.meetings.entities;

export const getMeetingLoadingStatus = () => (state: IStoreState) =>
  state.meetings.isLoading;

export const getDataMeetingsStatus = () => (state: IStoreState) =>
  state.meetings.dataLoaded;

export default meetingsReducer;
