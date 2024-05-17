export interface ITask {
  _id: string;
  userId: string;
  objectId: string;
  managerId: string;
  date: string;
  time: string;
  comment: string;
  result: string;
  isDone: boolean;
  isCallTask: boolean;
  created_at: string;
  updated_at: string;
}

export interface ITaskCreateInitState {
  date: Date | null;
  time: Date | null;
  comment: string | null;
  objectId: string | null;
  managerId: string | null;
  result: string | null;
  isDone: boolean;
  isCallTask: boolean;
}

export interface IManagerTaskCreateInitState {
  date: Date | null;
  time: Date | null;
  comment: string | null;
  objectId: string | null;
  managerId: string | null;
  result: string | null;
  isDone: boolean;
  isCallTask: boolean;
}
