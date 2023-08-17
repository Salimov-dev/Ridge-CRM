import { Box, styled } from "@mui/material";
import LayoutTitle from "../../../common/layout-title";
import PageBackButton from "../../../common/buttons/page-back-button";

const Component = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Header = () => {
  return (
    <Component>
      <LayoutTitle text="Добавить нового менеджера" />
      <PageBackButton path="/users" />
    </Component>
  );
};

export default Header;
