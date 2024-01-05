import { useDispatch } from "react-redux";
import { Box, styled } from "@mui/material";
// components
import ButtonStyled from "@components/common/buttons/button-styled.button";

const Component = styled(Box)`
  display: flex;
  gap: 4px;
  margin-left: 20px;
`;

const ButtonsPanel = ({
  object,
  onEdit,
  onClose,
  isEdit,
  isAuthorEntity = true,
  onOpenCreatePresentationPage,
  isTopButtonsPanel = false,
}) => {
  const dispatch = useDispatch();
  const hasCloud = !!object?.cloudLink?.length;

  const handleOpenCloud = () => {
    const cloudLink = object?.cloudLink;

    if (cloudLink) {
      window.open(cloudLink, "_blank");
    }
  };

  return (
    <Component>
      {isEdit ? (
        <>
          {hasCloud ? (
            <ButtonStyled
              title="Открыть облако"
              style="SUCCESS"
              onClick={handleOpenCloud}
            />
          ) : null}
          {isAuthorEntity ? (
            <>
              {!isTopButtonsPanel && (
                <ButtonStyled
                  title="Добавить презентацию"
                  style="SUCCESS"
                  onClick={onOpenCreatePresentationPage}
                />
              )}
              <ButtonStyled title="Править" style="SUCCESS" onClick={onEdit} />
            </>
          ) : null}
        </>
      ) : null}
      <ButtonStyled title="Закрыть" style="CANCEL" onClick={onClose} />
    </Component>
  );
};

export default ButtonsPanel;
