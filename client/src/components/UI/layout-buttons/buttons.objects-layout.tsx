import styled from "@emotion/styled";
import { Box } from "@mui/material";
import { useSelector } from "react-redux";
// icons
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import SyncAltOutlinedIcon from "@mui/icons-material/SyncAltOutlined";
import SmartDisplayOutlinedIcon from "@mui/icons-material/SmartDisplayOutlined";
// hooks
import useDialogHandlers from "@hooks/dialog/use-dialog-handlers";
// components
import ButtonStyled from "@components/common/buttons/button-styled.button";
import ClearFilterButton from "@components/common/buttons/clear-filter.button";
import { objectsLayoutInitialState } from "@components/UI/initial-states/objects-layout.initial-state";
// utils
import { getIsInputEmpty } from "@utils/other/get-is-input-empty";
// store
import { getIsCurrentUserRoleCurator } from "@store/user/users.store";

const Component = styled(Box)`
  display: flex;
  gap: 4px;
  margin-bottom: 4px;
`;

const ButtonsObjectsLayout = ({ data, reset, setState }) => {
  const isInputEmpty = getIsInputEmpty(data, objectsLayoutInitialState);
  const isCurrentUserRoleCurator = useSelector(getIsCurrentUserRoleCurator());

  const {
    handleOpenCreateObjectPage,
    handleOpenTransferObjectPage,
    handleOpenVideoPlayerPage
  } = useDialogHandlers(setState);

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
