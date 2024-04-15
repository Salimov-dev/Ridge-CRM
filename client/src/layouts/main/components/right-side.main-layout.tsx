import styled from "@emotion/styled";
import { Box, Hidden } from "@mui/material";
import backgroundImage from "@assets/main-background.png";
import IconsContactMainLayout from "./contacts.main-layout";

const Component = styled(Box)`
  margin: 20px 0 0 0;
  width: 100%;
  display: flex;
  background-size: auto 100%;
  background-repeat: no-repeat;
  background-position: left top;
  background-image: url(${backgroundImage});
`;

const RightSideMainLayout = () => {
  return (
    <Hidden lgDown>
      <Component>
        <IconsContactMainLayout />
      </Component>
    </Hidden>
  );
};

export default RightSideMainLayout;
