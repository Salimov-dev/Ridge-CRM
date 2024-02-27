import ButtonStyled from "@components/common/buttons/button-styled.button";
import ClearFilterButton from "@components/common/buttons/clear-filter.button";
import styled from "@emotion/styled";
import { Box } from "@mui/material";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import SyncAltOutlinedIcon from "@mui/icons-material/SyncAltOutlined";

const Component = styled(Box)`
  display: flex;
  gap: 4px;
  margin-bottom: 4px;
`;

const Buttons = ({
  initialState,
  reset,
  onOpenCreateObjectPage,
  onOpenTransferObjectPage,
  isCurator,
  isInputEmpty
}) => {
  return (
    <Component>
      <ButtonStyled
        title="Создать объект"
        style="OBJECT"
        variant="contained"
        icon={<AddCircleOutlineOutlinedIcon />}
        onClick={onOpenCreateObjectPage}
      />
      {isCurator && (
        <ButtonStyled
          title="Передать объекты"
          style="TRANSFER_OJECTS"
          variant="contained"
          icon={<SyncAltOutlinedIcon />}
          onClick={onOpenTransferObjectPage}
        />
      )}
      {isInputEmpty && (
        <ClearFilterButton reset={reset} initialState={initialState} />
      )}
    </Component>
  );
};

export default Buttons;
