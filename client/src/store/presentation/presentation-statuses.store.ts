import { Dispatch, createSlice } from "@reduxjs/toolkit";
import { presentationStatusesArrray } from "@data/presentations/presentations-statuses";

export interface IStoreState {
  presentationStatus: { entities: { _id: string; name: string }[] | null };
}

const presentationStatusesSlice = createSlice({
  name: "presentationStatus",
  initialState: {
    entities: null
  },
  reducers: {
    presentationStatusLoaded: (state, action) => {
      state.entities = action.payload;
    }
  }
});

const { reducer: presentationStatusReducer, actions } =
  presentationStatusesSlice;
const { presentationStatusLoaded } = actions;

export const loadPresentationStatusList = () => (dispatch: Dispatch) => {
  dispatch(presentationStatusLoaded(presentationStatusesArrray));
};

export const getPresentationStatusesList = () => (state: IStoreState) =>
  state.presentationStatus.entities;

export const getPresentationStatusById =
  (statusId: string) => (state: IStoreState) => {
    if (state?.presentationStatus.entities) {
      const status = state.presentationStatus.entities.find(
        (status) => status?._id === statusId
      );
      return status;
    }
  };

export const getPresentationStatusNameById =
  (statusId: string) => (state: IStoreState) => {
    if (state?.presentationStatus.entities) {
      const obj = state.presentationStatus.entities.find(
        (status) => status?._id === statusId
      );
      const result = obj?.name;
      return result;
    }
  };

export default presentationStatusReducer;
