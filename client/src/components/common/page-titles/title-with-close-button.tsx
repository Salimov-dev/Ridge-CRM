import { Box, styled } from "@mui/material";
import LayoutTitle from "./layout-title";
import CloseButton from "../buttons/close-button";

const Component = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const TitleWithCloseButton = ({ title, onClose }) => {
  return (
    <Component>
      <LayoutTitle title={title} />
      <CloseButton onClose={onClose} />
    </Component>
  );
};

export default TitleWithCloseButton;
