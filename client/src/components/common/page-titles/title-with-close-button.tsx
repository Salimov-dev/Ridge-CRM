import { Box, styled } from "@mui/material";
import LayoutTitle from "./layout-title";
import CloseButton from "../buttons/close-button";

const Component = styled(Box)`
  display: flex;
  align-items: start;
  justify-content: space-between;
`;

const TitleWithCloseButton = ({ title, onClose, background, color }) => {
  return (
    <Component>
      <LayoutTitle title={title} background={background} color={color}/>
      <CloseButton onClose={onClose} />
    </Component>
  );
};

export default TitleWithCloseButton;
