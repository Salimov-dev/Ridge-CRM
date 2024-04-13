import styled from "@emotion/styled";
import { Box, Hidden } from "@mui/material";
import backgroundImage from "@assets/main-background.png";
import Contacts from "./contacts.main-layout";

const Component = styled(Box)`
  margin: 20px 0 0 0;
  width: 100%;
  display: flex;
  background-size: auto 100%;
  background-repeat: no-repeat;
  background-position: left top;
`;

const RightSideMainLayout = () => {
  return (
    <Hidden lgDown>
      <Component
        sx={{
          backgroundImage: `url(${backgroundImage})`
        }}
      >
        <Contacts />
      </Component>
    </Hidden>
  );
};

export default RightSideMainLayout;
