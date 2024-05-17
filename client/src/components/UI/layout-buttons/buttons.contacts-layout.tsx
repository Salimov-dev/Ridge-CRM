import styled from "@emotion/styled";
import { Box } from "@mui/material";
// components
import ButtonStyled from "@components/common/buttons/button-styled.button";
import ClearFilterButton from "@components/common/buttons/clear-filter.button";
// initial-states
import { contactsLayoutInitialState } from "@initial-states/layouts/contacts-layout.initial-state";
// icons
import SmartDisplayOutlinedIcon from "@mui/icons-material/SmartDisplayOutlined";
// hooks
import contactsDialogsState from "@dialogs/dialog-handlers/contacts.dialog-handlers";
import videoTrainingDialogsState from "@dialogs/dialog-handlers/video-training.dialog-handlers";

const Component = styled(Box)`
  display: flex;
  gap: 4px;
  margin-bottom: 4px;
`;

const ButtonsContactsLayout = ({ data, reset, setState }) => {
  const isInputEmpty =
    JSON.stringify(contactsLayoutInitialState) !== JSON.stringify(data);

  const { handleOpenCreateContactPage } = contactsDialogsState({ setState });
  const { handleOpenVideoPlayerPage } = videoTrainingDialogsState({ setState });

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
