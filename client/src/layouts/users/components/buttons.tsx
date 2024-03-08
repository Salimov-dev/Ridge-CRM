import AddTeammateButton from "@components/common/buttons/add-teammate.button";
import ClearFilterButton from "@components/common/buttons/clear-filter.button";
import MakePaymentButton from "@components/common/buttons/make-payment.button";
import SmartDisplayOutlinedIcon from "@mui/icons-material/SmartDisplayOutlined";
import styled from "@emotion/styled";
import { Box } from "@mui/material";
import ButtonStyled from "@components/common/buttons/button-styled.button";

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
  isInputEmpty,
  onOpenVideoPlayerPage
}) => {
  return (
    <Component>
      <AddTeammateButton onClick={onOpenCreateUserPage} />
      <MakePaymentButton onClick={onOpenMakePaymentPage} />
      <ButtonStyled
        title="Видео-инструкция"
        style="VIDEO_INSTR"
        variant="contained"
        icon={<SmartDisplayOutlinedIcon />}
        onClick={onOpenVideoPlayerPage}
      />
      {isInputEmpty && (
        <ClearFilterButton reset={reset} initialState={initialState} />
      )}
    </Component>
  );
};

export default Buttons;
