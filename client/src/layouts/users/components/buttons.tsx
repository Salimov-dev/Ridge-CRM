import AddTeammateButton from "@components/common/buttons/add-teammate.button";
import ClearFilterButton from "@components/common/buttons/clear-filter.button";
import MakePaymentButton from "@components/common/buttons/make-payment.button";
import styled from "@emotion/styled";
import { Box } from "@mui/material";

const Component = styled(Box)`
  display: flex;
  gap: 4px;
  margin-bottom: 6px;
`;

const Buttons = ({
  initialState,
  reset,
  onOpenCreateUserPage,
  onOpenMakePaymentPage,
  isInputEmpty
}) => {
  return (
    <Component>
      <AddTeammateButton onClick={onOpenCreateUserPage} />
      <MakePaymentButton onClick={onOpenMakePaymentPage} />
      {isInputEmpty && (
        <ClearFilterButton reset={reset} initialState={initialState} />
      )}
    </Component>
  );
};

export default Buttons;
