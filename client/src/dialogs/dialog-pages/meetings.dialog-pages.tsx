import { Dispatch, FC, SetStateAction } from "react";
// components
import DialogStyled from "@components/common/dialog/dialog-styled";
import CreateMeeting from "@components/pages/meeting/create-meeting/create-meeting.page";
import UpdateMeeting from "@components/pages/meeting/update-meeting/update-meeting.page";
// dialogs;
import meetingsDialogsState from "@dialogs/dialog-handlers/meetings.dialog-handlers";
// interfaces
import { IDialogPagesState } from "@interfaces/state/dialog-pages-state.interface";

interface MeetingsDialogPagesProps {
  state: IDialogPagesState;
  setState: Dispatch<SetStateAction<IDialogPagesState>>;
}

const MeetingsDialogPages: FC<MeetingsDialogPagesProps> = ({
  state,
  setState
}) => {
  const { handleCloseCreateMeetingPage, handleCloseUpdateMeetingPage } =
    meetingsDialogsState({ setState });

  return (
    <>
      <DialogStyled
        component={
          <CreateMeeting onClose={handleCloseCreateMeetingPage} state={state} />
        }
        maxWidth="lg"
        onClose={handleCloseCreateMeetingPage}
        open={state.createMeetingPage}
      />
      <DialogStyled
        component={
          <UpdateMeeting
            state={state}
            meetingId={state.meetingId}
            onClose={handleCloseUpdateMeetingPage}
          />
        }
        onClose={handleCloseUpdateMeetingPage}
        maxWidth="md"
        open={state.updateMeetingPage}
      />
    </>
  );
};

export default MeetingsDialogPages;
