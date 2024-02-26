import { io } from "socket.io-client";
import { createSelector } from "reselect";
import { createAction, createSlice } from "@reduxjs/toolkit";
// utils
import isOutDated from "@utils/auth/is-out-date";
// services
import localStorageService from "@services/user/local.storage-service";
import companyService from "@services/company/company.service";
// config
import configFile from "@config/config.json";

const socket = io(configFile.ioEndPoint);

const initialState = localStorageService.getAccessToken()
  ? {
      entities: null,
      isLoading: true,
      error: null,
      isLoggedIn: true,
      dataLoaded: false,
      lastFetch: null
    }
  : {
      entities: null,
      isLoading: false,
      error: null,
      isLoggedIn: false,
      dataLoaded: false,
      lastFetch: null
    };

const companiesSlice = createSlice({
  name: "companies",
  initialState,
  reducers: {
    companiesRequested: (state) => {
      state.isLoading = true;
    },
    companiesReceived: (state, action) => {
      state.entities = action.payload;
      state.dataLoaded = true;
      state.isLoading = false;
    },
    companiesFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    companyCreated: (state, action) => {
      const newCompany = action.payload;
      if (!state.entities.some((company) => company._id === newCompany._id)) {
        state.entities.push(newCompany);
      }
    },
    companyUpdateSuccessed: (state, action) => {
      state.entities[
        state.entities.findIndex((comp) => comp._id === action.payload._id)
      ] = action.payload;
    },
    companiesUpdateSuccessed: (state, action) => {
      state.entities = state.entities.map((comp) => {
        const updatedCompany = action.payload.find(
          (updatedComp) => updatedComp._id === comp._id
        );
        if (updatedCompany) {
          return updatedCompany;
        }
        return comp;
      });
    },
    companyRemoved: (state, action) => {
      state.entities = state.entities.filter(
        (comp) => comp._id !== action.payload
      );
    }
  }
});

const companyCreateRequested = createAction("companies/companyCreateRequested");
const createCompanyFailed = createAction("companies/createCompanyFailed");
const companyUpdateRequested = createAction("companies/companyUpdateRequested");
const companyUpdateFailed = createAction("companies/companyUpdateFailed");
const removeCompanyRequested = createAction("companies/removeCompanyRequested");
const removeCompanyFailed = createAction("companies/removeCompanyFailed");

const { reducer: companiesReducer, actions } = companiesSlice;
const {
  companiesRequested,
  companiesReceived,
  companiesFailed,
  companyCreated,
  companyUpdateSuccessed,
  companiesUpdateSuccessed,
  companyRemoved
} = actions;

export const loadCompaniesList = () => async (dispatch, getState) => {
  const { lastFetch } = getState().companies;
  if (isOutDated(lastFetch)) {
    dispatch(companiesRequested());
    try {
      const { content } = await companyService.get();
      dispatch(companiesReceived(content));
    } catch (error) {
      companiesFailed(error.message);
    }
  }
};

export function createCompany(payload) {
  return async function (dispatch) {
    dispatch(companyCreateRequested());
    try {
      const { content } = await companyService.create(payload);
      socket.emit("companyCreated", content);
    } catch (error) {
      dispatch(createCompanyFailed(error.message));
    }
  };
}

export function createCompanyUpdate(payload) {
  return async function (dispatch) {
    dispatch(companyCreateRequested());
    try {
      dispatch(companyCreated(payload));
    } catch (error) {
      dispatch(createCompanyFailed(error.message));
    }
  };
}

export const updateCompany = (payload) => async (dispatch) => {
  dispatch(companyUpdateRequested());
  try {
    await companyService.update(payload);
    socket.emit("companyUpdated", payload);
  } catch (error) {
    dispatch(companyUpdateFailed(error.message));
  }
};

export const updateCompanyUpdate = (payload) => async (dispatch) => {
  dispatch(companyUpdateRequested());
  try {
    dispatch(companyUpdateSuccessed(payload));
  } catch (error) {
    dispatch(companyUpdateFailed(error.message));
  }
};

export const updateCompanies = (payload) => async (dispatch) => {
  dispatch(companyUpdateRequested());
  try {
    dispatch(companiesUpdateSuccessed(payload));
  } catch (error) {
    dispatch(companyUpdateFailed(error.message));
  }
};

// export const updateCompaniesUpdate = (payload) => async (dispatch) => {
//   dispatch(companyUpdateRequested());
//   try {
//     console.log("payload updateCompaniesUpdate", payload);

//     dispatch(companiesUpdateSuccessed(payload));
//   } catch (error) {
//     dispatch(companyUpdateFailed(error.message));
//   }
// };

export const removeCompany = (companyId) => async (dispatch) => {
  dispatch(removeCompanyRequested());
  try {
    await companyService.remove(companyId);
    socket.emit("companyDeleted", companyId);
  } catch (error) {
    dispatch(removeCompanyFailed(error.message));
  }
};

export const removeCompanyUpdate = (companyId) => async (dispatch) => {
  dispatch(removeCompanyRequested());
  try {
    dispatch(companyRemoved(companyId));
  } catch (error) {
    dispatch(removeCompanyFailed(error.message));
  }
};

export const getObjectcompaniesList = (companyId) =>
  createSelector(
    (state) => state?.companies?.entities,
    (companies) => companies?.filter((comp) => comp?.companyId === companyId)
  );

export const getCompanyById = (id) => (state) => {
  if (state.companies.entities) {
    return state.companies.entities.find((comp) => comp._id === id);
  }
};

export const getCompanyNameById = (id) => (state) => {
  if (!id) {
    return "";
  }
  if (state.companies.entities) {
    const company = state?.companies?.entities.find((comp) => comp?._id === id);

    return company.name || ""; // в случае отсутствия имени вернуть пустую строку
  }
  return ""; // вернуть пустую строку, если нет компании в state
};

export const getCompaniesList = () => (state) => state.companies.entities;

export const getCompaniesLoadingStatus = () => (state) =>
  state.companies.isLoading;

export const getDatacCompaniesStatus = () => (state) =>
  state.companies.dataLoaded;

export default companiesReducer;
