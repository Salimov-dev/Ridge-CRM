// libraries
import { useTheme } from "@emotion/react";
import { tokens } from "@theme/theme";
import React, { FC, useState } from "react";
// components
import LoaderFullWindow from "@components/common/loader/loader-full-window";
import HeaderWithCloseButtonForPage from "@components/common/headers/header-with-close-button.page";
import ContentUpdateMeetingPage from "./components/content.update-meeting-page";
// interfaces
import { IDialogPagesState } from "@interfaces/state/dialog-pages-state.interface";

interface UpdateMeetingProps {
  meetingId: string;
  state: IDialogPagesState;
  onClose: () => void;
}

const UpdateMeeting: FC<UpdateMeetingProps> = React.memo(
  ({ state, meetingId, onClose }): JSX.Element => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const [isLoading, setIsLoading] = useState(false);

    return (
      <>
        <HeaderWithCloseButtonForPage
          title="Изменить встречу"
          color="white"
          background={colors.meeting["primary"]}
          onClose={onClose}
        />
        <ContentUpdateMeetingPage
          state={state}
          meetingId={meetingId}
          onClose={onClose}
          setIsLoading={setIsLoading}
          isLoading={isLoading}
        />
        <LoaderFullWindow
          color={colors.grey[600]}
          size={75}
          isLoading={isLoading}
        />
      </>
    );
  }
);

export default UpdateMeeting;
