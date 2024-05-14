import { IMeetingCreateInitState } from "@interfaces/meeting/meeting.interface";

export const meetingCreateInitialState: IMeetingCreateInitState = {
  status: "",
  type: "",
  date: null,
  time: null,
  comment: "",
  result: "",
  city: "",
  address: "",
  latitude: null,
  longitude: null,
  objectId: "",
  isDone: false
};
