import { Dispatch, SetStateAction } from "react";
// interfaces
import { IDialogPagesState } from "@interfaces/state/dialog-pages-state.interface";
import { RowSelection } from "@interfaces/table/row-selection.type";
// dialog-pages
import VideoTrainingDialogPages from "./dialog-pages/video-training.dialog-pages";
import PresentationsDialogPages from "./dialog-pages/presentations.dialog-pages";
import MeetingsDialogPages from "./dialog-pages/meetings.dialog-pages";
import ObjectsDialogPages from "./dialog-pages/objects.dialog-pages";
import TasksDialogPages from "./dialog-pages/tasks.dialog-pages";
import LastContactsDialogPages from "./dialog-pages/last-contacts.dialog-pages";
import MainLayoutDialogPages from "./dialog-pages/main-layout.dialog-pages";
import ContactsDialogPages from "./dialog-pages/contacts.dialog-pages";
import CompaniesDialogPages from "./dialog-pages/companies.dialog-pages";
import UsersDialogPages from "./dialog-pages/users.dialog-pages";
import AuthDialogPages from "./dialog-pages/auth.dialog-pages";
import PaymentsDialogPages from "./dialog-pages/payments.dialog-pages";

interface DialogPagesProps {
  state: IDialogPagesState;
  setState: Dispatch<SetStateAction<IDialogPagesState>>;
  selectedObjects?: string[];
  setRowSelection?: Dispatch<SetStateAction<RowSelection>>;
  videoTitle?: string;
  videoSrc?: string;
}

const DialogPages = ({
  state,
  setState,
  selectedObjects = [],
  setRowSelection = () => {},
  videoTitle = "",
  videoSrc = ""
}: DialogPagesProps) => {
  return (
    <>
      <LastContactsDialogPages state={state} setState={setState} />
      <ContactsDialogPages state={state} setState={setState} />
      <TasksDialogPages state={state} setState={setState} />
      <MainLayoutDialogPages state={state} setState={setState} />
      <CompaniesDialogPages state={state} setState={setState} />
      <MeetingsDialogPages state={state} setState={setState} />
      <PresentationsDialogPages state={state} setState={setState} />
      <ObjectsDialogPages
        state={state}
        setState={setState}
        selectedObjects={selectedObjects}
        setRowSelection={setRowSelection}
      />
      <VideoTrainingDialogPages
        state={state}
        setState={setState}
        videoTitle={videoTitle}
        videoSrc={videoSrc}
      />

      <AuthDialogPages state={state} setState={setState} />
      <UsersDialogPages state={state} setState={setState} />
      <PaymentsDialogPages state={state} setState={setState} />
    </>
  );
};

export default DialogPages;
