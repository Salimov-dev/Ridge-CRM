import ButtonStyled from "@components/common/buttons/button-styled.button";
import styled from "@emotion/styled";
import { Box } from "@mui/material";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import DeleteIcon from "@mui/icons-material/Delete";

const Component = styled(Box)`
  display: flex;
  gap: 4px;
  margin-bottom: 4px;
`;

const AvatarButtons = ({
  handleOpenUpdateUserAvatarPage,
  handleClickOpenConfirmDialog,
  avatarSrc
}) => {
  return (
    <Component>
      <ButtonStyled
        title={null}
        width="100%"
        style="OBJECT"
        variant="contained"
        padding="4px 0 4px 10px"
        icon={<DriveFileRenameOutlineIcon />}
        onClick={handleOpenUpdateUserAvatarPage}
      />
      <ButtonStyled
        title={null}
        style="CANCEL"
        width="100%"
        variant="contained"
        padding="4px 0 4px 10px"
        icon={<DeleteIcon />}
        disabled={!avatarSrc}
        onClick={handleClickOpenConfirmDialog}
      />
    </Component>
  );
};

export default AvatarButtons;
