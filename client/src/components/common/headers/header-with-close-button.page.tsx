import { Box, styled } from "@mui/material";
import LayoutTitle from "./header-for-layout";
import CloseButtonIconButton from "../button-icons/close.button-icon";
import { useTheme } from "@emotion/react";
import { tokens } from "@theme/theme";

const Component = styled(Box)`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const HeaderWithCloseButtonForPage = ({
  title = "",
  onClose = () => {},
  background = "",
  color = "white",
  margin = "0"
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Component sx={{ margin: margin }}>
      <LayoutTitle
        title={title}
        background={background ? background : colors.header["gold"]}
        color={color}
      />
      <CloseButtonIconButton onClose={onClose} margin="0 0 20px 0" />
    </Component>
  );
};

export default HeaderWithCloseButtonForPage;
