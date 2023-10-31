import { Box, styled } from "@mui/material";
import CloseButtonIconButton from "../../../common/buttons/icons buttons/close-button-icon";
import LoginHeaderTitle from "./login-header-title";

const Component = styled(Box)`
width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const LoginHeader = ({
  title = "",
  onClose,
  background = "inherit",
  color = "inherit",
}) => {
  return (
    <Component>
      <LoginHeaderTitle title={title} background={background} color={color} />
      <CloseButtonIconButton onClose={onClose} />
    </Component>
  );
};

export default LoginHeader;
