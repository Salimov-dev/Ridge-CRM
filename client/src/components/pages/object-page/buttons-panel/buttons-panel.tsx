import { useDispatch } from "react-redux";
import { Box, styled } from "@mui/material";
// components
import ButtonStyled from "@components/common/buttons/button-styled";
// store
import { setCreatePresentationOpenState } from "@store/presentation/create-presentation.store";

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
  isTopButtonsPanel = false,
}) => {
  const dispatch = useDispatch();
  const hasCloud = !!object?.cloudLink?.length;

  const handleOpenCreateObject = () => {
    dispatch<any>(setCreatePresentationOpenState(true));
  };

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
                  onClick={handleOpenCreateObject}
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
