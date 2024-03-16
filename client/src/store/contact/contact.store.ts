import { io } from "socket.io-client";
import { createSelector } from "reselect";
import { createAction, createSlice } from "@reduxjs/toolkit";
// utils
import isOutDated from "@utils/auth/is-out-date";
// services
import localStorageService from "@services/user/local.storage-service";
import contactService from "@services/contact/contact.service";
// config
import configFile from "@config/config.json";
// store
import { updateObjects } from "@store/object/objects.store";

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

export const loadContactsList = () => async (dispatch, getState) => {
  const { lastFetch } = getState().contacts;
  if (isOutDated(lastFetch)) {
    dispatch(contactsRequested());
    try {
      const { content } = await contactService.get();
      dispatch(contactsReceived(content));
    } catch (error) {
      contactsFailed(error.message);
    }
  }
};

export function createContact(payload) {
  return async function (dispatch) {
    dispatch(contactCreateRequested());
    try {
      const { content } = await contactService.create(payload);
      socket.emit("contactCreated", content);
    } catch (error) {
      dispatch(createContactFailed(error.message));
    }
  };
}

export function createContactUpdate(payload) {
  return async function (dispatch) {
    dispatch(contactCreateRequested());
    try {
      dispatch(contactCreated(payload));
    } catch (error) {
      dispatch(createContactFailed(error.message));
    }
  };
}

export const updateContact = (payload) => async (dispatch) => {
  dispatch(contactUpdateRequested());
  try {
    const { content } = await contactService.update(payload);

    dispatch(updateObjects(content));
    socket.emit("contactUpdated", payload);
  } catch (error) {
    dispatch(contactUpdateFailed(error.message));
  }
};

export const updateContactUpdate = (payload) => async (dispatch) => {
  dispatch(contactUpdateRequested());
  try {
    dispatch(contactUpdateSuccessed(payload.newData));
  } catch (error) {
    dispatch(contactUpdateFailed(error.message));
  }
};

export const updateContacts = (payload) => async (dispatch) => {
  dispatch(contactUpdateRequested());
  try {
    dispatch(contactsUpdateSuccessed(payload));
  } catch (error) {
    dispatch(contactUpdateFailed(error.message));
  }
};

export const removeContact = (contactId) => async (dispatch) => {
  dispatch(removeContactRequested());
  try {
    await contactService.remove(contactId);
    socket.emit("contactDeleted", contactId);
  } catch (error) {
    dispatch(removeContactFailed(error.message));
  }
};

export const removeContactUpdate = (contactId) => async (dispatch) => {
  dispatch(removeContactRequested());
  try {
    dispatch(contactRemoved(contactId));
  } catch (error) {
    dispatch(removeContactFailed(error.message));
  }
};

export const getObjectContactsList = (contactId) =>
  createSelector(
    (state) => state?.contacts?.entities,
    (contacts) => contacts?.filter((cont) => cont?.contactId === contactId)
  );

export const getContactById = (id) => (state) => {
  if (state.contacts.entities) {
    return state.contacts.entities.find((cont) => cont._id === id);
  }
};

export const getContactsBycontactId = (contactId) => (state) => {
  if (state.contacts.entities) {
    return state.contacts.entities.filter(
      (cont) => cont.contactId === contactId
    );
  }
};

export const getContactsList = () => (state) => state.contacts.entities;

export const getContactLoadingStatus = () => (state) =>
  state.contacts.isLoading;

export const getDataContactsStatus = () => (state) => state.contacts.dataLoaded;

export default contactsReducer;
