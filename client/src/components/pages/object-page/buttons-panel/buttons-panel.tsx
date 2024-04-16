import { useSelector } from "react-redux";
import { Box, styled } from "@mui/material";
import ButtonStyled from "@components/common/buttons/button-styled.button";
import {
  getCurrentUserId,
  getIsUserAuthorThisEntity
} from "@store/user/users.store";

const Component = styled(Box)`
  display: flex;
  gap: 4px;
  margin-left: 20px;
`;

const ButtonsPanel = ({
  object,
  onClose,
  onOpenUpdateObjectPage,
  onOpenCreatePresentationPage,
  hasCloudButton,
  hasAddPresentationButton
}) => {
  const currentUserId = useSelector(getCurrentUserId());

  const isAuthorEntity = useSelector(
    getIsUserAuthorThisEntity(currentUserId, object)
  );

  const hasCloudLink = !!object?.cloudLink?.length;
  const handleOpenCloud = () => {
    const cloudLink = object?.cloudLink;
    if (cloudLink) {
      window.open(cloudLink, "_blank");
    }
  };

  return (
    <Component>
      <>
        {hasCloudLink ? (
          hasCloudButton ? (
            <ButtonStyled
              title="Открыть облако"
              style="SUCCESS"
              onClick={handleOpenCloud}
            />
          ) : null
        ) : null}
        {isAuthorEntity ? (
          <>
            {hasAddPresentationButton && (
              <ButtonStyled
                title="Добавить презентацию"
                style="SUCCESS"
                onClick={onOpenCreatePresentationPage}
              />
            )}
            <ButtonStyled
              title="Править"
              style="SUCCESS"
              onClick={onOpenUpdateObjectPage}
            />
          </>
        ) : null}
      </>

      <ButtonStyled title="Закрыть" style="CANCEL" onClick={onClose} />
    </Component>
  );
};

export default ButtonsPanel;
