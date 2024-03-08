import ButtonStyled from "@components/common/buttons/button-styled.button";
import ClearFilterButton from "@components/common/buttons/clear-filter.button";
import SmartDisplayOutlinedIcon from "@mui/icons-material/SmartDisplayOutlined";
import styled from "@emotion/styled";
import { Box } from "@mui/material";

const Component = styled(Box)`
  display: flex;
  gap: 4px;
  margin-bottom: 4px;
`;

const Buttons = ({
  initialState,
  reset,
  onOpenCreateMeetingPage,
  onOpenVideoPlayerPage,
  isInputEmpty
}) => {
  return (
    <Component>
      <ButtonStyled
        title="Создать встречу"
        style="MEETING"
        variant="contained"
        onClick={onOpenCreateMeetingPage}
      />
      <ButtonStyled
        title="Видео-инструкция"
        style="VIDEO_INSTR"
        variant="contained"
        icon={<SmartDisplayOutlinedIcon />}
        onClick={onOpenVideoPlayerPage}
      />
      {isInputEmpty && (
        <ClearFilterButton reset={reset} initialState={initialState} />
      )}
    </Component>
  );
};

export default Buttons;
