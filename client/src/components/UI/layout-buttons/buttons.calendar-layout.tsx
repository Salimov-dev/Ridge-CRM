import { useSelector } from "react-redux";
import styled from "@emotion/styled";
import { Box } from "@mui/material";
// components
import ButtonStyled from "@components/common/buttons/button-styled.button";
// icons
import SmartDisplayOutlinedIcon from "@mui/icons-material/SmartDisplayOutlined";
// store
import { getIsCurrentUserRoleCurator } from "@store/user/users.store";
// hooks
import tasksDialogsState from "@dialogs/dialog-handlers/tasks.dialog-handlers";
import meetingsDialogsState from "@dialogs/dialog-handlers/meetings.dialog-handlers";
import videoTrainingDialogsState from "@dialogs/dialog-handlers/video-training.dialog-handlers";

const Component = styled(Box)`
  display: flex;
  gap: 4px;
  margin-bottom: 4px;
`;

const ButtonsCalendarLayout = ({ setState }) => {
  const isCurrentUserRoleCurator = useSelector(getIsCurrentUserRoleCurator());

  const { handleOpenCreateMyTaskPage, handleOpenCreateManagerTaskPage } =
    tasksDialogsState({ setState });
  const { handleOpenCreateMeetingPage } = meetingsDialogsState({ setState });
  const { handleOpenVideoPlayerPage } = videoTrainingDialogsState({ setState });

  return (
    <Component>
      <ButtonStyled
        title="Создать задачу себе"
        style="MY_TASK"
        variant="contained"
        onClick={handleOpenCreateMyTaskPage}
      />
      {isCurrentUserRoleCurator && (
        <ButtonStyled
          title="Создать задачу менеджеру"
          style="MANAGER_TASK"
          variant="contained"
          onClick={handleOpenCreateManagerTaskPage}
        />
      )}
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
    </Component>
  );
};

export default ButtonsCalendarLayout;
