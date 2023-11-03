import { Box, styled } from "@mui/material";
import NegativeOutlinedButton from "../../buttons/negative-outlined-button";
import PositiveOutlinedButton from "../../buttons/positive-outlined-button";
import OpenObjectCloudButton from "../../../UI/dialogs/buttons/open-object-cloud-button";

const Component = styled(Box)`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
`;

const Container = styled(Box)`
  display: flex;
  gap: 4px;
`;

const FooterButtons = ({
  object = "",
  onCreate = () => {},
  onUpdate = () => {},
  onClose = () => {},
  onRemove = () => {},
  isValid = "false",
  isEditMode = false,
  withoutRemoveButton = false,
  isAuthorEntity = true,
}) => {
  return (
    <Component>
      <Container>
        {isAuthorEntity ? (
          <PositiveOutlinedButton
            title={isEditMode ? "Сохранить" : "Создать"}
            isValid={!isValid}
            type="text"
            onClick={() => (isEditMode ? onUpdate() : onCreate())}
          />
        ) : null}

        {isEditMode ? <OpenObjectCloudButton object={object} /> : null}
      </Container>
      <Container>
        {isEditMode && !withoutRemoveButton && isAuthorEntity ? (
          <NegativeOutlinedButton title="Удалить" onClick={() => onRemove()} />
        ) : null}
        <NegativeOutlinedButton title="Отмена" onClick={onClose} />
      </Container>
    </Component>
  );
};

export default FooterButtons;
