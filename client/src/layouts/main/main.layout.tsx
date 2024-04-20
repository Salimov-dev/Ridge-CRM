import "dayjs/locale/ru";
import React, { useState } from "react";
import { Box, styled } from "@mui/material";
// components
import PageDialogs from "@components/common/dialog/page-dialogs";
import { ContainerStyled } from "@components/common/container/container-styled";
import LogoMainLayout from "./components/logo.main-layout";
import RightSideMainLayout from "./components/right-side.main-layout";
import LeftSideMainLayout from "./components/left-side.main-layout";
import BackgroundBottomImageMainLayout from "./components/background-bottom-image.main-layout";

const ContentContainer = styled(Box)`
  height: 100%;
  width: 100%;
  display: flex;
`;

const MainLayout = React.memo(() => {
  const [state, setState] = useState({
    loginPage: false,
    registerPage: false,
    personalPolicyPage: false
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
      <BackgroundBottomImageMainLayout />
      <PageDialogs state={state} setState={setState} />
    </ContainerStyled>
  );
});

export default MainLayout;
