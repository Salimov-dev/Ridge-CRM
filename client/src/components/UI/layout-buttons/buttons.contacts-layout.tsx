import styled from "@emotion/styled";
import { Box } from "@mui/material";
// components
import ButtonStyled from "@components/common/buttons/button-styled.button";
import ClearFilterButton from "@components/common/buttons/clear-filter.button";
import { contactsLayoutInitialState } from "@components/UI/initial-states/contacts-layout.initial-state";
// icons
import SmartDisplayOutlinedIcon from "@mui/icons-material/SmartDisplayOutlined";
// hooks
import useDialogHandlers from "@hooks/dialog/use-dialog-handlers";

const Component = styled(Box)`
  display: flex;
  gap: 4px;
  margin-bottom: 4px;
`;

const ButtonsContactsLayout = ({ data, reset, setState }) => {
  const isInputEmpty =
    JSON.stringify(contactsLayoutInitialState) !== JSON.stringify(data);

  const { handleOpenCreateContactPage, handleOpenVideoPlayerPage } =
    useDialogHandlers(setState);

  return (
    <Component>
      <ButtonStyled
        title="Создать контакт"
        style="CONTACT"
        variant="contained"
        onClick={handleOpenCreateContactPage}
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
          initialState={contactsLayoutInitialState}
        />
      )}
    </Component>
  );
};

export default ButtonsContactsLayout;
