// libraries
import { tokens } from "@theme/theme";
import { useTheme } from "@emotion/react";
import React, { FC, useState } from "react";
// components
import LoaderFullWindow from "@components/common/loader/loader-full-window";
import ContentCreateMeetingPage from "./components/content.create-meeting-page";
// interfaces
import { IDialogPagesState } from "@interfaces/state/dialog-pages-state.interface";

interface CreateMeetingProps {
  state: IDialogPagesState;
  onClose: () => void;
}

const CreateMeeting: FC<CreateMeetingProps> = React.memo(
  ({ state, onClose }): JSX.Element => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [isLoading, setIsLoading] = useState(false);

    return (
      <>
        <ContentCreateMeetingPage
          state={state}
          onClose={onClose}
          setIsLoading={setIsLoading}
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

export default CreateMeeting;
