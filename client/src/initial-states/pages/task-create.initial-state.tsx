import { ITaskCreateInitState } from "@interfaces/task/task.interface";

export const taskCreateInitialState: ITaskCreateInitState = {
  date: null,
  time: null,
  comment: "",
  objectId: null,
  managerId: null,
  result: null,
  isDone: false,
  isCallTask: true
};
