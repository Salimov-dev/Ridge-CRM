import { Dispatch, SetStateAction } from "react";
import { IDialogPagesState } from "@interfaces/state/dialog-pages-state.interface";

interface IMeetingsDialogsStateProps {
  setState: Dispatch<SetStateAction<IDialogPagesState>>;
}

const meetingsDialogsState = ({ setState }: IMeetingsDialogsStateProps) => {
  const handleOpenCreateMeetingPage = (day: any): void => {
    setState((prevState) => ({
      ...prevState,
      createMeetingPage: true,
      dateCreate: day && day.format ? day : null
    }));
  };

  const handleCloseCreateMeetingPage = (): void => {
    setState((prevState) => ({
      ...prevState,
      createMeetingPage: false
    }));
  };

  const handleOpenUpdateMeetingPage = (meetingId: string): void => {
    setState((prevState) => ({
      ...prevState,
      updateMeetingPage: true,
      meetingId: meetingId
    }));
  };

  const handleCloseUpdateMeetingPage = (): void => {
    setState((prevState) => ({
      ...prevState,
      updateMeetingPage: false
    }));
  };

  return {
    handleOpenCreateMeetingPage,
    handleCloseCreateMeetingPage,
    handleOpenUpdateMeetingPage,
    handleCloseUpdateMeetingPage
  };
};

export default meetingsDialogsState;
