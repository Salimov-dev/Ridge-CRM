import TransferObjectToAnotherManagerButton from "@components/UI/dialogs/buttons/transfer-object-to-another-manager-button";
import ButtonStyled from "@components/common/buttons/button-styled";
import ClearFilterButton from "@components/common/buttons/clear-filter-button";
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
  onOpenCreateObjectPage,
  isCurator,
  isInputEmpty,
}) => {
  return (
    <Component>
      <ButtonStyled
        title="Создать объект"
        variant="OBJECT"
        onClick={onOpenCreateObjectPage}
      />
      {isCurator && <TransferObjectToAnotherManagerButton />}
      {isInputEmpty && (
        <ClearFilterButton reset={reset} initialState={initialState} />
      )}
    </Component>
  );
};

export default Buttons;
