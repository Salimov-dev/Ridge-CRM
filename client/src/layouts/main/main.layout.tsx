import "dayjs/locale/ru";
import React, { useState } from "react";
import { Box, Hidden, styled } from "@mui/material";
// assets
import backgroundImage from "@assets/main-background.png";
// components
import PageDialogs from "@components/common/dialog/page-dialogs";
import { ContainerStyled } from "@components/common/container/container-styled";
import LogoMainLayout from "./components/logo.main-layout";
import RightSideMainLayout from "./components/right-side.main-layout";
import LeftSideMainLayout from "./components/left-side.main-layout";

const ContentContainer = styled(Box)`
  height: 100%;
  width: 100%;
  display: flex;
`;

const BackgroundBottomImage = styled("img")({
  width: "100%",
  height: "auto"
});

const MainLayout = React.memo(() => {
  const [state, setState] = useState({
    loginPage: false,
    registerPage: false
  });

  return (
    <ContainerStyled>
      <LogoMainLayout />
      <ContentContainer
        sx={{ flexDirection: { xs: "column", md: "column", lg: "row" } }}
      >
        <LeftSideMainLayout setState={setState} />
        <RightSideMainLayout />
      </ContentContainer>
      <Hidden lgUp>
        <BackgroundBottomImage src={backgroundImage} />
      </Hidden>
      <PageDialogs state={state} setState={setState} />
    </ContainerStyled>
  );
});

export default MainLayout;
