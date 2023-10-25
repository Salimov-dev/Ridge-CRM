import { createAction, createSelector, createSlice } from "@reduxjs/toolkit";
import isOutDated from "../../utils/auth/is-out-date";
import localStorageService from "../../services/user/local.storage-service";
import tasksService from "../../services/tasks/tasks.service";
import dayjs from "dayjs";

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
    taskIsDoneStatus: (state, action) => {
      state.entities[
        state.entities.findIndex((task) => task._id === action.payload._id)
      ] = action.payload;
    },
  },
});

const taskCreateRequested = createAction("tasks/taskCreateRequested");
const createTaskFailed = createAction("tasks/createtaskFailed");
const taskUpdateRequested = createAction("tasks/taskUpdateRequested");
const taskUpdateFailed = createAction("tasks/taskUpdateFailed");
const removeTaskRequested = createAction("tasks/removetaskRequested");
const removeTaskFailed = createAction("tasks/removetaskFailed");
const taskIsDoneRequested = createAction("tasks/taskIsDoneRequested");
const taskIsDoneFailed = createAction("tasks/taskIsDoneFailed");

const { reducer: tasksReducer, actions } = tasksSlice;
const {
  tasksRequested,
  tasksReceived,
  tasksFailed,
  taskCreated,
  taskUpdateSuccessed,
  taskIsDoneStatus,
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
      dispatch(taskCreated(content));
      loadTasksList();
    } catch (error) {
      dispatch(createTaskFailed(error.message));
    }
  };
}

export const updateMyTask = (payload) => async (dispatch) => {
  dispatch(taskUpdateRequested());
  try {
    dispatch(taskUpdateSuccessed(payload));
    await tasksService.update(payload);
  } catch (error) {
    dispatch(taskUpdateFailed(error.message));
  }
};
// export const updateMyTask = (payload) => async (dispatch) => {
//   dispatch(taskUpdateRequested());
//   try {
//     const { content } = await tasksService.update(payload)

//     dispatch(taskUpdateSuccessed(content));
//   } catch (error) {
//     dispatch(taskUpdateFailed(error.message));
//   }
// };

export const removeTask = (taskId) => async (dispatch) => {
  dispatch(removeTaskRequested());
  try {
    dispatch(taskRemoved(taskId));
    await tasksService.remove(taskId);
  } catch (error) {
    dispatch(removeTaskFailed(error.message));
  }
};

export const setIsDoneTaskStatus = (payload) => async (dispatch) => {
  dispatch(taskIsDoneRequested());
  try {
    dispatch(taskIsDoneStatus(payload));
    await tasksService.update(payload);
  } catch (error) {
    dispatch(taskIsDoneFailed(error.message));
  }
};

export const getTasksList = () => (state) => state?.tasks?.entities;

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

export const getTaskLoadingStatus = () => (state) => state.tasks.isLoading;

export const getDataTasksStatus = () => (state) => state.tasks.dataLoaded;

export const getTaskById = (id) => (state) => {
  if (state.tasks.entities) {
    return state.tasks.entities.find((task) => task._id === id);
  }
};

export const getTasksWeeklyList = () => (state) => {
  const currentDate = dayjs();
  const tasks = state.tasks.entities;

  const weeklyTasks = tasks?.filter((task) => {
    const createdAt = dayjs(task?.date);
    const startOfWeek = currentDate.startOf("week");
    const endOfWeek = currentDate.endOf("week");
    return createdAt.isBetween(startOfWeek, endOfWeek) && task.isDone !== true;
  });

  return weeklyTasks;
};

export default tasksReducer;
