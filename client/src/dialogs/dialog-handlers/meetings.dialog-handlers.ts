import { Dispatch, SetStateAction } from "react";
import { IDialogPagesState } from "@interfaces/state/dialog-pages-state.interface";
import dayjs from "dayjs";

interface IMeetingsDialogsStateProps {
  setState: Dispatch<SetStateAction<IDialogPagesState>>;
}

function isDate(day: Date | null): day is Date {
  return day !== null && dayjs(day).isValid();
}

const meetingsDialogsState = ({ setState }: IMeetingsDialogsStateProps) => {
  const handleOpenCreateMeetingPage = (day: Date | null): void => {
    if (isDate(day)) {
      setState((prevState) => ({
        ...prevState,
        createMeetingPage: true,
        dateCreate: day
      }));
    } else {
      setState((prevState) => ({
        ...prevState,
        createMeetingPage: true,
        dateCreate: null
      }));
    }
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
