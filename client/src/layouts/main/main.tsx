import "dayjs/locale/ru";
import React, { useState } from "react";
import { Box, Hidden, styled } from "@mui/material";
import backgroundImage from "@assets/main-background.png";
// components
import PageDialogs from "@components/common/dialog/page-dialogs";
import { ContainerStyled } from "@components/common/container/container-styled";
import Logo from "./components/logo";
import RightSide from "./components/right-side";
import LeftSide from "./components/left-side";

const ContentContainer = styled(Box)`
  height: 100%;
  width: 100%;
  display: flex;
`;

const Main = React.memo(() => {
  const [state, setState] = useState({
    loginPage: false,
    registerPage: false
  });

  return (
    <ContainerStyled>
      <Logo />
      <ContentContainer
        sx={{ flexDirection: { xs: "column", md: "column", lg: "row" } }}
      >
        <LeftSide setState={setState} />
        <RightSide />
      </ContentContainer>
      <Hidden lgUp>
        <img src={backgroundImage} style={{ width: "100%", height: "auto" }} />
      </Hidden>
      <PageDialogs state={state} setState={setState} />
    </ContainerStyled>
  );
});

export default Main;
