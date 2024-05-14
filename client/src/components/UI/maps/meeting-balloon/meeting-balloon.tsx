import React, { Dispatch, FC, SetStateAction } from "react";
import { Box, styled } from "@mui/material";
import { useSelector } from "react-redux";
// components
import FirstSectionMeetingBalloon from "./components/first-section.meeting-balloon";
import SecondSectionMeetingBalloon from "./components/second-section.meeting-balloon";
import ButtonsMeetingBalloon from "./components/buttons.meeting-balloon";
import Loader from "@components/common/loader/loader";
// interfaces
import { IDialogPagesState } from "@interfaces/state/dialog-pages-state.interface";
import { getMeetingLoadingStatus } from "@store/meeting/meetings.store";

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
    const isLoading = useSelector(getMeetingLoadingStatus());

    return !isLoading ? (
      <BaloonContainer>
        <FirstSectionMeetingBalloon meetingId={meetingId} />
        <SecondSectionMeetingBalloon meetingId={meetingId} />
        <ButtonsMeetingBalloon meetingId={meetingId} setState={setState} />
      </BaloonContainer>
    ) : (
      <Loader color="royalBlue" height="140px" />
    );
  }
);

export default MeetingBalloon;
