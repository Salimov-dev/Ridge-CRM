import styled from "@emotion/styled";
import { Box } from "@mui/material";
// components
import ButtonStyled from "@components/common/buttons/button-styled.button";
import ClearFilterButton from "@components/common/buttons/clear-filter.button";
// initial-states
import { meetingsLayoutInitialState } from "@initial-states/layouts/meetings-layout.initial-state";
// icons
import SmartDisplayOutlinedIcon from "@mui/icons-material/SmartDisplayOutlined";
// utils
import { getIsInputEmpty } from "@utils/input/get-is-input-empty";
// hooks
import useDialogHandlers from "@hooks/dialog/use-dialog-handlers";

const Component = styled(Box)`
  display: flex;
  gap: 4px;
  margin-bottom: 4px;
`;

const ButtonsMeetingsLayout = ({ data, reset, setState }) => {
  const isInputEmpty = getIsInputEmpty(data, meetingsLayoutInitialState);
  const { handleOpenCreateMeetingPage, handleOpenVideoPlayerPage } =
    useDialogHandlers(setState);

  return (
    <Component>
      <ButtonStyled
        title="Создать встречу"
        style="MEETING"
        variant="contained"
        onClick={handleOpenCreateMeetingPage}
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
