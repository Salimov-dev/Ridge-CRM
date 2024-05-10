import React, { Dispatch, FC, SetStateAction } from "react";
import { Box, styled } from "@mui/material";
// components
import FirstSectionMeetingBalloon from "./components/first-section.meeting-balloon";
import SecondSectionMeetingBalloon from "./components/second-section.meeting-balloon";
import ButtonsMeetingBalloon from "./components/buttons.meeting-balloon";
// interfaces
import { IDialogPagesState } from "@interfaces/state/dialog-pages-state.interface";

interface MeetingBalloonProps {
  meetingId: string;
  setState: Dispatch<SetStateAction<IDialogPagesState>>;
}

const BaloonContainer = styled(Box)`
  width: 100%;
  height: 100%;
  display: flex;
  gap: 4px;
  flex-direction: column;
  align-items: start;
  padding: 10px 0;
`;

const MeetingBalloon: FC<MeetingBalloonProps> = React.memo(
  ({ meetingId, setState }) => {
    return (
      <BaloonContainer>
        <FirstSectionMeetingBalloon meetingId={meetingId} />
        <SecondSectionMeetingBalloon meetingId={meetingId} />
        <ButtonsMeetingBalloon meetingId={meetingId} setState={setState} />
      </BaloonContainer>
    );
  }
);

export default MeetingBalloon;
