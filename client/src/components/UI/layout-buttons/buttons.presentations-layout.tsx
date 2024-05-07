import styled from "@emotion/styled";
import { Box } from "@mui/material";
import { UseFormReset } from "react-hook-form";
import { Dispatch, FC, SetStateAction } from "react";
// icons
import SmartDisplayOutlinedIcon from "@mui/icons-material/SmartDisplayOutlined";
// components
import ButtonStyled from "@components/common/buttons/button-styled.button";
import ClearFilterButton from "@components/common/buttons/clear-filter.button";
// initial-states
import { presentationsLayoutInitialState } from "@initial-states/layouts/presentations-layout.initial-state";
// utils
import { getIsInputEmpty } from "@utils/input/get-is-input-empty";
// interfaces
import { IPresentationDialogsState } from "@interfaces/presentation/presentation.interfaces";
// dialog-handlers
import presentationDialogsState from "@dialog-handlers/presentation.dialog-handlers";
import videoPlayerDialogsState from "@dialog-handlers/video-player.dialog-handlers";

const Component = styled(Box)`
  display: flex;
  gap: 4px;
  margin-bottom: 4px;
`;

type IData = Record<string, string | string[] | null>;

interface ButtonsPresentationsLayoutProps {
  data: IData;
  reset: UseFormReset<IData>;
  setState: Dispatch<SetStateAction<IPresentationDialogsState>>;
}

const ButtonsPresentationsLayout: FC<ButtonsPresentationsLayoutProps> = ({
  data,
  reset,
  setState
}): JSX.Element => {
  const isInputEmpty = getIsInputEmpty({
    data: data,
    initialState: presentationsLayoutInitialState
  });

  const { handleOpenCreatePresentationPage } = presentationDialogsState({
    setState
  });

  const { handleOpenVideoPlayerPage } = videoPlayerDialogsState({ setState });

  return (
    <Component>
      <ButtonStyled
        title="Создать презентацию"
        style="PRESENTATION"
        variant="contained"
        onClick={handleOpenCreatePresentationPage}
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
          initialState={presentationsLayoutInitialState}
        />
      )}
    </Component>
  );
};

export default ButtonsPresentationsLayout;
