import TransferObjectToAnotherManagerButton from "@components/UI/dialogs/buttons/transfer-object-to-another-manager-button";
import ButtonStyled from "@components/common/buttons/button-styled";
import ClearFilterButton from "@components/common/buttons/clear-filter-button";

const Buttons = ({
  initialState,
  reset,
  onOpenCreateObjectPage,
  isCurator,
  isInputEmpty,
}) => {
  return (
    <>
      {isInputEmpty && (
        <ClearFilterButton reset={reset} initialState={initialState} />
      )}
      <ButtonStyled
        title="Создать объект"
        variant="OBJECT"
        onClick={onOpenCreateObjectPage}
      />
      {isCurator && <TransferObjectToAnotherManagerButton />}
    </>
  );
};

export default Buttons;
