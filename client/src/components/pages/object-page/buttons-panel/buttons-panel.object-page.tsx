import { useSelector } from "react-redux";
import { Box, styled } from "@mui/material";
import { Dispatch, FC, SetStateAction } from "react";
// components
import ButtonStyled from "@components/common/buttons/button-styled.button";
// dialogs
import objectsDialogsState from "@dialogs/dialog-handlers/objects.dialog-handlers";
import presentationsDialogsState from "@dialogs/dialog-handlers/presentations.dialog-handlers";
// interfaces
import { IObject } from "@interfaces/object/object.interface";
import { IDialogPagesState } from "@interfaces/state/dialog-pages-state.interface";
// store
import {
  getCurrentUserId,
  getIsUserAuthorThisEntity
} from "@store/user/users.store";

interface ButtonsPanelObjectPageProps {
  object: IObject | null;
  setState: Dispatch<SetStateAction<IDialogPagesState>>;
  hasCloudButton?: boolean;
  hasAddPresentationButton?: boolean;
}

const Component = styled(Box)`
  display: flex;
  gap: 4px;
  margin-left: 20px;
`;

const ButtonsPanelObjectPage: FC<ButtonsPanelObjectPageProps> = ({
  object,
  setState,
  hasCloudButton = true,
  hasAddPresentationButton = true
}): JSX.Element => {
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

  const { handleOpenUpdateObjectPage, handleCloseObjectPage } =
    objectsDialogsState({ setState });

  const { handleOpenCreatePresentationPage } = presentationsDialogsState({
    setState
  });

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
                onClick={handleOpenCreatePresentationPage}
              />
            )}
            <ButtonStyled
              title="Править"
              style="SUCCESS"
              onClick={handleOpenUpdateObjectPage}
            />
          </>
        ) : null}
      </>

      <ButtonStyled
        title="Закрыть"
        style="CANCEL"
        onClick={handleCloseObjectPage}
      />
    </Component>
  );
};

export default ButtonsPanelObjectPage;
