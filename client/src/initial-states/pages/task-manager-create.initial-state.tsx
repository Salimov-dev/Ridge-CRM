import { IManagerTaskCreateInitState } from "@interfaces/task/task.interface";

export const taskManagerCreateInitialState: IManagerTaskCreateInitState = {
  date: null,
  time: null,
  comment: "",
  objectId: null,
  managerId: null,
  result: null,
  isDone: false,
  isCallTask: true
};
