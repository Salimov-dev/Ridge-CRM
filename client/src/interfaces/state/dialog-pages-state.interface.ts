export interface IDialogPagesState {
  createPage: boolean;
  updatePage: boolean;
  objectPage: boolean;
  updateObjectPage: boolean;
  createPresentationPage: boolean;
  updatePresentationPage: boolean;
  videoPlayerPage: boolean;
  objectId: string | null;
  presentationId: string;
  dateCreate: string;
  createMyTaskPage: boolean;
  updateMyTaskPage: boolean;
  createManagerTaskPage: boolean;
  updateManagerTaskPage: boolean;
  createLastContactPage: boolean;
  updateLastContactPage: boolean;
  createMeetingPage: boolean;
  updateMeetingPage: boolean;
  taskId: string;
  lastContactId: string;
  meetingId: string;
  transferObjectPage: boolean;
}
