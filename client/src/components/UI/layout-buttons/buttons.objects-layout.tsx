import styled from "@emotion/styled";
import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import { UseFormReset } from "react-hook-form";
import { Dispatch, FC, SetStateAction } from "react";
// icons
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import SyncAltOutlinedIcon from "@mui/icons-material/SyncAltOutlined";
import SmartDisplayOutlinedIcon from "@mui/icons-material/SmartDisplayOutlined";
// hooks
// components
import ButtonStyled from "@components/common/buttons/button-styled.button";
import ClearFilterButton from "@components/common/buttons/clear-filter.button";
// initial-states
import { objectsLayoutInitialState } from "@initial-states/layouts/objects-layout.initial-state";
// utils
import { getIsInputEmpty } from "@utils/input/get-is-input-empty";
// interfaces
import { IDataProps } from "@interfaces/data/data-props.type";
import { IDialogPagesState } from "@interfaces/state/dialog-pages-state.interface";
// store
import { getIsCurrentUserRoleCurator } from "@store/user/users.store";
import objectsDialogsState from "@dialogs/dialog-handlers/objects.dialog-handlers";
import videoTrainingDialogsState from "@dialogs/dialog-handlers/video-training.dialog-handlers";

interface ButtonsObjectsLayoutProps {
  data: IDataProps;
  reset: UseFormReset<IDataProps>;
  setState: Dispatch<SetStateAction<IDialogPagesState>>;
}

const Component = styled(Box)`
  display: flex;
  gap: 4px;
  margin-bottom: 4px;
`;

const ButtonsObjectsLayout: FC<ButtonsObjectsLayoutProps> = ({
  data,
  reset,
  setState
}) => {
  const isInputEmpty = getIsInputEmpty({
    data: data,
    initialState: objectsLayoutInitialState
  });
  const isCurrentUserRoleCurator = useSelector(getIsCurrentUserRoleCurator());

  const { handleOpenCreateObjectPage, handleOpenTransferObjectPage } =
    objectsDialogsState({ setState });

  const { handleOpenVideoPlayerPage } = videoTrainingDialogsState({ setState });

  return (
    <Component>
      <ButtonStyled
        title="Создать объект"
        style="OBJECT"
        variant="contained"
        icon={<AddCircleOutlineOutlinedIcon />}
        onClick={handleOpenCreateObjectPage}
      />
      {isCurrentUserRoleCurator && (
        <ButtonStyled
          title="Передать объекты"
          style="TRANSFER_OJECTS"
          variant="contained"
          icon={<SyncAltOutlinedIcon />}
          onClick={handleOpenTransferObjectPage}
        />
      )}
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
          initialState={objectsLayoutInitialState}
        />
      )}
    </Component>
  );
};

export default ButtonsObjectsLayout;
