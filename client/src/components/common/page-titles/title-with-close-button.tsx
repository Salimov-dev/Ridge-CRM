import { Box, styled } from "@mui/material";
import LayoutTitle from "./layout-title";
import CloseButtonIconButton from "../buttons/icons buttons/close-button-icon";

const Component = styled(Box)`
  display: flex;
  align-items: start;
  justify-content: space-between;
`;

const TitleWithCloseButton = ({
  title = "",
  onClose,
  background = "inherit",
  color = "inherit",
}) => {
  return (
    <Component>
      <LayoutTitle title={title} background={background} color={color} />
      <CloseButtonIconButton onClose={onClose} />
    </Component>
  );
};

export default TitleWithCloseButton;
