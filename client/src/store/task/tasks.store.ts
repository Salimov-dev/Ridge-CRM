import { io } from "socket.io-client";
import { createAction, createSelector, createSlice } from "@reduxjs/toolkit";
// utils
import isOutDated from "../../utils/auth/is-out-date";
// services
import localStorageService from "../../services/user/local.storage-service";
import tasksService from "../../services/tasks/tasks.service";
// config
import configFile from "../../config.json";

const socket = io(configFile.ioEndPoint);

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

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    tasksRequested: (state) => {
      state.isLoading = true;
    },
    tasksReceived: (state, action) => {
      state.entities = action.payload;
      state.dataLoaded = true;
      state.isLoading = false;
    },
    tasksFailed: (state, action) => {
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
  },
});

const taskCreateRequested = createAction("tasks/taskCreateRequested");
const createTaskFailed = createAction("tasks/createtaskFailed");
const taskUpdateRequested = createAction("tasks/taskUpdateRequested");
const taskUpdateFailed = createAction("tasks/taskUpdateFailed");
const removeTaskRequested = createAction("tasks/removetaskRequested");
const removeTaskFailed = createAction("tasks/removetaskFailed");

const { reducer: tasksReducer, actions } = tasksSlice;
const {
  tasksRequested,
  tasksReceived,
  tasksFailed,
  taskCreated,
  taskUpdateSuccessed,
  taskRemoved,
} = actions;

export const loadTasksList = () => async (dispatch, getState) => {
  const { lastFetch } = getState().tasks;
  if (isOutDated(lastFetch)) {
    dispatch(tasksRequested());
    try {
      const { content } = await tasksService.get();

      dispatch(tasksReceived(content));
    } catch (error) {
      tasksFailed(error.message);
    }
  }
};

export function createTask(payload) {
  return async function (dispatch) {
    dispatch(taskCreateRequested());
    try {
      const { content } = await tasksService.create(payload);
      socket.emit("taskCreated", content);
    } catch (error) {
      dispatch(createTaskFailed(error.message));
    }
  };
}

export function createTaskUpdate(payload) {
  return async function (dispatch) {
    dispatch(taskCreateRequested());
    try {
      dispatch(taskCreated(payload));
    } catch (error) {
      dispatch(createTaskFailed(error.message));
    }
  };
}

export const updateTask = (payload) => async (dispatch) => {
  dispatch(taskUpdateRequested());
  try {
    await tasksService.update(payload);
    socket.emit("taskUpdated", payload);
  } catch (error) {
    dispatch(taskUpdateFailed(error.message));
  }
};

export const updateTaskUpdate = (payload) => async (dispatch) => {
  try {
    dispatch(taskUpdateSuccessed(payload));
  } catch (error) {
    dispatch(taskUpdateFailed(error.message));
  }
};

export const removeTask = (taskId) => async (dispatch) => {
  dispatch(removeTaskRequested());
  try {
    await tasksService.remove(taskId);
    socket.emit("taskDeleted", taskId);
  } catch (error) {
    dispatch(removeTaskFailed(error.message));
  }
};

export const removeTaskUpdate = (taskId) => async (dispatch) => {
  dispatch(removeTaskRequested());
  try {
    dispatch(taskRemoved(taskId));
  } catch (error) {
    dispatch(removeTaskFailed(error.message));
  }
};

export const getObjectTasksList = (objectId) =>
  createSelector(
    (state) => state?.tasks?.entities,
    (tasks) => tasks?.filter((task) => task?.objectId === objectId)
  );

export const getTasksByObjectId = (objectId) => (state) => {
  const tasks = state?.tasks.entities;
  const objectTasks = tasks?.filter((task) => task.objectId === objectId);
  return objectTasks;
};

export const getTaskById = (id) => (state) => {
  if (state.tasks.entities) {
    return state.tasks.entities.find((task) => task._id === id);
  }
};

export const getTasksList = () => (state) => state?.tasks?.entities;
export const getTaskLoadingStatus = () => (state) => state.tasks.isLoading;
export const getDataTasksStatus = () => (state) => state.tasks.dataLoaded;

export default tasksReducer;
