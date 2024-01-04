import ButtonStyled from "@components/common/buttons/button-styled.button";
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
  isCurator,
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
    </Component>
  );
};

export default Buttons;
