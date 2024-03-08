import ButtonStyled from "@components/common/buttons/button-styled.button";
import SmartDisplayOutlinedIcon from "@mui/icons-material/SmartDisplayOutlined";
import styled from "@emotion/styled";
import { Box } from "@mui/material";

const Component = styled(Box)`
  display: flex;
  gap: 4px;
  margin-bottom: 4px;
`;

const Buttons = ({
  onOpenCreateMyTask,
  onOpenCreateManagerTask,
  onOpenCreateMeetingPage,
  onOpenVideoPlayerPage,
  isCurator
}) => {
  return (
    <Component>
      <ButtonStyled
        title="Создать задачу себе"
        style="MY_TASK"
        variant="contained"
        onClick={onOpenCreateMyTask}
      />
      {isCurator && (
        <ButtonStyled
          title="Создать задачу менеджеру"
          style="MANAGER_TASK"
          variant="contained"
          onClick={onOpenCreateManagerTask}
        />
      )}
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
    </Component>
  );
};

export default Buttons;
