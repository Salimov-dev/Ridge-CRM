import styled from "@emotion/styled";
import { Box } from "@mui/material";
import { Dispatch, FC, SetStateAction } from "react";
import { UseFormReset } from "react-hook-form";
// icons
import SmartDisplayOutlinedIcon from "@mui/icons-material/SmartDisplayOutlined";
// components
import ButtonStyled from "@components/common/buttons/button-styled.button";
import ClearFilterButton from "@components/common/buttons/clear-filter.button";
// initial-states
import { presentationsLayoutInitialState } from "@initial-states/layouts/presentations-layout.initial-state";
// hooks
import useDialogHandlers from "@hooks/dialog/use-dialog-handlers";
// types
import { IDialogPagesState } from "src/types/dialog-pages/dialog-pages-state.interface";
import { IPresentation } from "src/types/presentation/presentation.interface";
// utils
import { getIsInputEmpty } from "@utils/input/get-is-input-empty";

const Component = styled(Box)`
  display: flex;
  gap: 4px;
  margin-bottom: 4px;
`;

interface ButtonsPresentationsLayoutProps {
  data: IPresentation;
  reset: UseFormReset<IPresentation>;
  setState: Dispatch<SetStateAction<IDialogPagesState>>;
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
