import styled from "@emotion/styled";
import { Box } from "@mui/material";
import { UseFormReset } from "react-hook-form";
import { Dispatch, FC, SetStateAction } from "react";
// components
import ButtonStyled from "@components/common/buttons/button-styled.button";
import ClearFilterButton from "@components/common/buttons/clear-filter.button";
// initial-states
import { meetingsLayoutInitialState } from "@initial-states/layouts/meetings-layout.initial-state";
// icons
import SmartDisplayOutlinedIcon from "@mui/icons-material/SmartDisplayOutlined";
// utils
import { getIsInputEmpty } from "@utils/input/get-is-input-empty";
// dialogs
import videoTrainingDialogsState from "@dialogs/dialog-handlers/video-training.dialog-handlers";
import meetingsDialogsState from "@dialogs/dialog-handlers/meetings.dialog-handlers";
// interfaces
import { IDialogPagesState } from "@interfaces/state/dialog-pages-state.interface";

type IData = Record<string, string | string[] | null>;

interface ButtonsMeetingsLayoutProps {
  data: IData;
  reset: UseFormReset<IData>;
  setState: Dispatch<SetStateAction<IDialogPagesState>>;
}

const Component = styled(Box)`
  display: flex;
  gap: 4px;
  margin-bottom: 4px;
`;

const ButtonsMeetingsLayout: FC<ButtonsMeetingsLayoutProps> = ({
  data,
  reset,
  setState
}) => {
  const isInputEmpty = getIsInputEmpty({
    data: data,
    initialState: meetingsLayoutInitialState
  });

  const { handleOpenCreateMeetingPage } = meetingsDialogsState({
    setState
  });

  const { handleOpenVideoPlayerPage } = videoTrainingDialogsState({ setState });

  return (
    <Component>
      <ButtonStyled
        title="Создать встречу"
        style="MEETING"
        variant="contained"
        onClick={() => handleOpenCreateMeetingPage(null)}
      />
      <ButtonStyled
        title="Видео-инструкция"
        style="VIDEO_INSTR"
        variant="contained"
        icon={<SmartDisplayOutlinedIcon />}
        onClick={handleOpenVideoPlayerPage}
      />
      {isInputEmpty && (
        <ClearFilterButton
          reset={reset}
          initialState={meetingsLayoutInitialState}
        />
      )}
    </Component>
  );
};

export default ButtonsMeetingsLayout;
