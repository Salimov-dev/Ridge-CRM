import { io } from "socket.io-client";
import { createSelector } from "reselect";
import { Dispatch, createAction, createSlice } from "@reduxjs/toolkit";
// utils
import isOutDated from "@utils/auth/is-out-date";
// services
import localStorageService from "@services/local-storage/local.storage-service";
import contactService from "@services/contact/contact.service";
// config
import configFile from "@config/config.json";
// store
import { updateObjects } from "@store/object/objects.store";
import { updateCompanies } from "@store/company/company.store";
import { IContact } from "@interfaces/contact/contact.inteface";

const socket = io(configFile.ioEndPoint);

interface IContactsStoreInitialState {
  entities: IContact[];
  isLoading: boolean;
  error: any;
  isLoggedIn: boolean;
  dataLoaded: boolean;
  lastFetch: string | null;
}

interface IStoreState {
  contacts: IContactsStoreInitialState;
}

const initialState: IContactsStoreInitialState =
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

const contactsSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {
    contactsRequested: (state) => {
      state.isLoading = true;
    },
    contactsReceived: (state, action) => {
      state.entities = action.payload;
      state.dataLoaded = true;
      state.isLoading = false;
    },
    contactsFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    contactCreated: (state, action) => {
      const newContact = action.payload;
      if (!state.entities.some((contact) => contact._id === newContact._id)) {
        state.entities.push(newContact);
      }
    },
    contactUpdateSuccessed: (state, action) => {
      state.entities[
        state.entities.findIndex((cont) => cont._id === action.payload._id)
      ] = action.payload;
    },
    contactsUpdateSuccessed: (state, action) => {
      const { updatedContacts } = action.payload;

      state.entities = state.entities.map((comp) => {
        const updatedContact = updatedContacts.find(
          (updatedCont) => updatedCont._id === comp._id
        );
        if (updatedContact) {
          return updatedContact;
        }
        return comp;
      });
    },
    contactRemoved: (state, action) => {
      state.entities = state.entities.filter(
        (cont) => cont._id !== action.payload
      );
    }
  }
});

const contactCreateRequested = createAction("contacts/contactCreateRequested");
const createContactFailed = createAction("contacts/createContactFailed");
const contactUpdateRequested = createAction("contacts/contactUpdateRequested");
const contactUpdateFailed = createAction("contacts/contactUpdateFailed");
const removeContactRequested = createAction("contacts/removeContactRequested");
const removeContactFailed = createAction("contacts/removeContactFailed");

const { reducer: contactsReducer, actions } = contactsSlice;
const {
  contactsRequested,
  contactsReceived,
  contactsFailed,
  contactCreated,
  contactUpdateSuccessed,
  contactsUpdateSuccessed,
  contactRemoved
} = actions;

export const loadContactsList =
  () =>
  async (
    dispatch: Dispatch,
    getState: () => { (): any; new (): any; contacts: { lastFetch: any } }
  ) => {
    const { lastFetch } = getState().contacts;
    if (isOutDated(lastFetch)) {
      dispatch(contactsRequested());
      try {
        const { content } = await contactService.get();
        dispatch(contactsReceived(content));
      } catch (error: any) {
        contactsFailed(error.message);
      }
    }
  };

export function createContact(payload: IContact) {
  return async function (dispatch: Dispatch) {
    dispatch(contactCreateRequested());
    try {
      const { content } = await contactService.create(payload);
      dispatch(updateCompanies(content.updatedCompanies));
      dispatch(updateObjects({ updatedObjects: content.updatedObjects }));
      socket.emit("contactCreated", content.newContact);
    } catch (error: any) {
      dispatch(createContactFailed(error.message));
    }
  };
}

export function createContactUpdate(payload: IContact) {
  return async function (dispatch: Dispatch) {
    dispatch(contactCreateRequested());
    try {
      dispatch(contactCreated(payload));
    } catch (error: any) {
      dispatch(createContactFailed(error.message));
    }
  };
}

export const updateContact =
  (payload: IContact) => async (dispatch: Dispatch) => {
    dispatch(contactUpdateRequested());
    try {
      const { content } = await contactService.update(payload);

      dispatch(updateCompanies(content.companiesRemovedCompanies));
      dispatch(updateCompanies(content.updatedCompanies));
      dispatch(
        updateObjects({ updatedObjects: content.objectsRemovedObjects })
      );
      dispatch(updateObjects({ updatedObjects: content.updatedObjects }));
      socket.emit("contactUpdated", payload);
    } catch (error: any) {
      dispatch(contactUpdateFailed(error.message));
    }
  };

export const updateContactUpdate = (payload) => async (dispatch: Dispatch) => {
  dispatch(contactUpdateRequested());
  try {
    dispatch(contactUpdateSuccessed(payload.newData));
  } catch (error: any) {
    dispatch(contactUpdateFailed(error.message));
  }
};

export const updateContacts =
  (payload: IContact) => async (dispatch: Dispatch) => {
    dispatch(contactUpdateRequested());
    try {
      dispatch(contactsUpdateSuccessed(payload));
      socket.emit("contactsUpdated", payload);
    } catch (error: any) {
      dispatch(contactUpdateFailed(error.message));
    }
  };

export const removeContact =
  (contactId: string) => async (dispatch: Dispatch) => {
    dispatch(removeContactRequested());
    try {
      await contactService.remove(contactId);
      socket.emit("contactDeleted", contactId);
    } catch (error: any) {
      dispatch(removeContactFailed(error.message));
    }
  };

export const removeContactUpdate =
  (contactId: string) => async (dispatch: Dispatch) => {
    dispatch(removeContactRequested());
    try {
      dispatch(contactRemoved(contactId));
    } catch (error: any) {
      dispatch(removeContactFailed(error.message));
    }
  };

export const getContactById =
  (contactId: string | null) =>
  (state: IStoreState): IContact | null => {
    if (state.contacts.entities) {
      const contact = state.contacts.entities.find(
        (cont) => cont._id === contactId
      );
      return contact !== undefined ? contact : null;
    } else {
      return null;
    }
  };

export const getContactsList = () => (state: IStoreState) =>
  state.contacts.entities;

export const getContactLoadingStatus = () => (state: IStoreState) =>
  state.contacts.isLoading;

export const getDataContactsStatus = () => (state: IStoreState) =>
  state.contacts.dataLoaded;

export default contactsReducer;
