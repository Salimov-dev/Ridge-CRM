import ButtonStyled from "@components/common/buttons/button-styled.button";
import ClearFilterButton from "@components/common/buttons/clear-filter.button";
import styled from "@emotion/styled";
import { Box } from "@mui/material";

const Component = styled(Box)`
  display: flex;
  gap: 4px;
  margin-bottom: 4px;
`;

const Buttons = ({
  handleOpenUpdateUserAvatarPage,
  handleClickOpenConfirmDialog,
  avatarSrc,
}) => {
  return (
    <Component>
      <ButtonStyled
        title="Изменить "
        style="OBJECT"
        variant="contained"
        onClick={handleOpenUpdateUserAvatarPage}
      />
      <ButtonStyled
        title="УДАЛИТЬ"
        style="CANCEL"
        variant="contained"
        disabled={!avatarSrc}
        onClick={handleClickOpenConfirmDialog}
      />
    </Component>
  );
};

export default Buttons;
