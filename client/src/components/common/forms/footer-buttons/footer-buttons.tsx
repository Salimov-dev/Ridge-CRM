import { Box, styled } from "@mui/material";
import CreateObjectFromRidgeButton from "../../../UI/dialogs/buttons/create-object-from-ridge-button";
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
  data={},
  object="",
  objectId = "",
  removeId = "",
  onCreate = () => {},
  onUpdate = () => {},
  onClose = () => {},
  onRemove = () => {},
  isValid = false,
  isEditMode = false,
  isRidgeObject = false,
  withoutRemoveButton = false,
  isAuthorEntity=true
}) => {
  return (
    <Component>
      <Container>
        {isAuthorEntity ? <PositiveOutlinedButton
          title={isEditMode ? "Сохранить" : "Создать"}
          isValid={!isValid}
          type="text"
          onClick={() => (isEditMode ? onUpdate() : onCreate())}
        /> : null}

        {isRidgeObject && isEditMode && isAuthorEntity ? (
          <CreateObjectFromRidgeButton data={data} objectId={objectId} onUpdate={onUpdate}/>
        ) : null}
        {isRidgeObject && isEditMode ? (
          <OpenObjectCloudButton object={object} />
        ) : null}
      </Container>
      <Container>
        {isEditMode && !withoutRemoveButton && isAuthorEntity ? (
          <NegativeOutlinedButton
            title="Удалить"
            onClick={() => onRemove(removeId)}
          />
        ) : null}
        <NegativeOutlinedButton title="Отмена" onClick={onClose} />
      </Container>
    </Component>
  );
};

export default FooterButtons;
