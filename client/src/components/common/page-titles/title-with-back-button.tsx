import { Box, styled } from "@mui/material";
import LayoutTitle from "./layout-title";
import PageBackButton from "../buttons/page-back-button";

const Component = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const TitleWithBackButton = ({title, path}) => {
  return (
    <Component>
      <LayoutTitle title={title} />
      <PageBackButton path={path} />
    </Component>
  );
};

export default TitleWithBackButton;
