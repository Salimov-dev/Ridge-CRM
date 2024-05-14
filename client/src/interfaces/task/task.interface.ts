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

// export interface IMeetingCreateInitState {
//   objectId: string;
//   cloudLink: string | null;
// }

// export enum MeetingStatuses {
//   Active = "64dd3e1bd617a71ad0aeeebd",
//   Completed = "64dd3e25d617a71ad0aeeebe",
//   Canceled = "64dd3e2cd617a71ad0aeeebf",
//   Deferred = "64dd3e35d617a71ad0aeeec0"
// }

// export enum MeetingTypes {
//   Introductory = "64e099d919e195eef88c7342",
//   ContractDiscussion = "64e09a0619e195eef88c7343",
//   ContractSigning = "64e09a1d19e195eef88c7344",
//   PremisesReception = "64e09a3419e195eef88c7345",
//   PremisesTransfer = "64e09a4219e195eef88c7346",
//   ObjectViewing = "64e09a8719e195eef88c7348",
//   EstimateRepair = "64e09ab119e195eef88c7349"
// }
