import { createAction, createSelector, createSlice } from "@reduxjs/toolkit";
import localStorageService from "../../services/user/local.storage-service";
import ridgeTasksService from "../../services/tasks/ridge-tasks.service";
import isOutDated from "../../utils/auth/is-out-date";

const initialState = localStorageService.getAccessToken()
  ? {
      entities: null,
      isLoading: true,
      error: null,
      isLoggedIn: true,
      dataLoaded: false,
      lastFetch: null,
    }
  : {
      entities: null,
      isLoading: false,
      error: null,
      isLoggedIn: false,
      dataLoaded: false,
      lastFetch: null,
    };

const ridgeTasksSlice = createSlice({
  name: "ridgeTasks",
  initialState,
  reducers: {
    ridgeTasksRequested: (state) => {
      state.isLoading = true;
    },
    ridgeTasksReceived: (state, action) => {
      state.entities = action.payload;
      state.dataLoaded = true;
      state.isLoading = false;
    },
    ridgeTasksFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    taskCreated: (state, action) => {
      if (!Array.isArray(state.entities)) {
        state.entities = [];
      }
      state.entities.push(action.payload);
    },
    taskUpdateSuccessed: (state, action) => {
      state.entities[
        state.entities.findIndex((task) => task._id === action.payload._id)
      ] = action.payload;
    },
    taskRemoved: (state, action) => {
      state.entities = state.entities.filter(
        (meet) => meet._id !== action.payload
      );
    },
    taskIsDoneStatus: (state, action) => {
      state.entities[
        state.entities.findIndex((task) => task._id === action.payload._id)
      ] = action.payload;
    },
  },
});

const taskCreateRequested = createAction("ridgeTasks/ridgeTaskCreateRequested");
const createTaskFailed = createAction("ridgeTasks/createRidgeTaskFailed");
const taskUpdateRequested = createAction("ridgeTasks/RidgeTaskUpdateRequested");
const taskUpdateFailed = createAction("ridgeTasks/ridgeTaskUpdateFailed");
const removeTaskRequested = createAction("ridgeTasks/removeRidgeTaskRequested");
const removeTaskFailed = createAction("ridgeTasks/removeRidgeTaskFailed");
const taskIsDoneRequested = createAction("tasks/ridgeTaskIsDoneRequested");
const taskIsDoneFailed = createAction("tasks/ridgeTaskIsDoneFailed");

const { reducer: ridgeTasksReducer, actions } = ridgeTasksSlice;
const {
  ridgeTasksRequested,
  ridgeTasksReceived,
  ridgeTasksFailed,
  taskCreated,
  taskUpdateSuccessed,
  taskIsDoneStatus,
  taskRemoved,
} = actions;

export const loadRidgeTasksList = () => async (dispatch, getState) => {
  const { lastFetch } = getState().ridgeTasks;
  if (isOutDated(lastFetch)) {
    dispatch(ridgeTasksRequested());
    try {
      const { content } = await ridgeTasksService.get();
      dispatch(ridgeTasksReceived(content));
    } catch (error) {
      ridgeTasksFailed(error.message);
    }
  }
};

export function createRidgeTask(payload) {
  return async function (dispatch) {
    dispatch(taskCreateRequested());
    try {
      const { content } = await ridgeTasksService.create(payload);
      dispatch(taskCreated(content));
      loadRidgeTasksList();
    } catch (error) {
      dispatch(createTaskFailed(error.message));
    }
  };
}

export const updateRidgeTask = (payload) => async (dispatch) => {
  dispatch(taskUpdateRequested());
  try {
    dispatch(taskUpdateSuccessed(payload));
    await ridgeTasksService.update(payload);
  } catch (error) {
    dispatch(taskUpdateFailed(error.message));
  }
};

export const removeRidgeTask = (taskId) => async (dispatch) => {
  dispatch(removeTaskRequested());
  try {
    dispatch(taskRemoved(taskId));
    await ridgeTasksService.remove(taskId);
  } catch (error) {
    dispatch(removeTaskFailed(error.message));
  }
};

export const setIsDoneRidgeTaskStatus = (payload) => async (dispatch) => {
  dispatch(taskIsDoneRequested());
  try {
    dispatch(taskIsDoneStatus(payload));
    await ridgeTasksService.update(payload);
  } catch (error) {
    dispatch(taskIsDoneFailed(error.message));
  }
};

export const getRidgeTasksList = () => (state) => state?.ridgeTasks?.entities;

export const getObjectRidgeTasksList = (objectId) =>
  createSelector(
    (state) => state?.ridgeTasks?.entities,
    (ridgeTasks) => ridgeTasks?.filter((task) => task?.objectId === objectId)
  );

export const getRidgeTasksByObjectId = (objectId) => (state) => {
  const ridgeTasks = state?.ridgeTasks.entities;
  const objectridgeTasks = ridgeTasks?.filter(
    (task) => task.objectId === objectId
  );
  return objectridgeTasks;
};

export const getRidgeTaskLoadingStatus = () => (state) =>
  state.ridgeTasks.isLoading;

export const getDataRidgeTasksStatus = () => (state) =>
  state.ridgeTasks.dataLoaded;

export const getRidgeTaskById = (id) => (state) => {
  if (state.ridgeTasks.entities) {
    return state.ridgeTasks.entities.find((task) => task._id === id);
  }
};

export default ridgeTasksReducer;
