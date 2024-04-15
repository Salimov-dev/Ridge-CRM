import styled from "@emotion/styled";
import { Box } from "@mui/material";
// icons
import SmartDisplayOutlinedIcon from "@mui/icons-material/SmartDisplayOutlined";
// components
import ButtonStyled from "@components/common/buttons/button-styled.button";
import ClearFilterButton from "@components/common/buttons/clear-filter.button";
// initial-states
import { presentationsLayoutInitialState } from "../initial-states/presentations-layout.initial-state";
// hooks
import useDialogHandlers from "@hooks/dialog/use-dialog-handlers";

const Component = styled(Box)`
  display: flex;
  gap: 4px;
  margin-bottom: 4px;
`;

const ButtonsPresentationsLayout = ({ data, reset, setState }) => {
  const isInputEmpty =
    JSON.stringify(presentationsLayoutInitialState) !== JSON.stringify(data);

  const { handleOpenCreatePresentationPage, handleOpenVideoPlayerPage } =
    useDialogHandlers(setState);
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
