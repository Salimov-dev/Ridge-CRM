import { Box, styled } from "@mui/material";
import LayoutTitle from "./layout-title";
import CloseButtonIconButton from "../buttons/icons buttons/close-button-icon";

const Component = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const HeaderWithCloseButton = ({
  title = "",
  onClose,
  background = "inherit",
  color = "inherit",
  margin = "0",
}) => {
  return (
    <Component sx={{ margin: margin }}>
      <LayoutTitle
        title={title}
        background={background}
        color={color}
        margin="0px"
      />
      <CloseButtonIconButton onClose={onClose} />
    </Component>
  );
};

export default HeaderWithCloseButton;
