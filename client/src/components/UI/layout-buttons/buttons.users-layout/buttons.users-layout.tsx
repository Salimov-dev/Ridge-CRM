import styled from "@emotion/styled";
import { Box } from "@mui/material";
// icons
import SmartDisplayOutlinedIcon from "@mui/icons-material/SmartDisplayOutlined";
// components
import AddTeammateButton from "./components/add-teammate.button";
import ClearFilterButton from "@components/common/buttons/clear-filter.button";
import MakePaymentButton from "./components/make-payment.button";
import ButtonStyled from "@components/common/buttons/button-styled.button";
// initial-states
import { usersLayoutInitialState } from "@initial-states/layouts/users-layout.initial-state";
// hooks
import useDialogHandlers from "@hooks/dialog/use-dialog-handlers";

const Component = styled(Box)`
  display: flex;
  gap: 4px;
  margin-bottom: 6px;
`;

const ButtonsUsersLayout = ({ data, setState, reset }) => {
  const isInputEmpty =
    JSON.stringify(usersLayoutInitialState) !== JSON.stringify(data);

  const {
    handleOpenCreateUserPage,
    handleOpenMakePaymentPage,
    handleOpenVideoPlayerPage
  } = useDialogHandlers(setState);
  return (
    <Component>
      <AddTeammateButton onClick={handleOpenCreateUserPage} />
      <MakePaymentButton onClick={handleOpenMakePaymentPage} />
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
          initialState={usersLayoutInitialState}
        />
      )}
    </Component>
  );
};

export default ButtonsUsersLayout;
